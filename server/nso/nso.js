const crypto = require('crypto');
const base64url = require('base64url');

let authParams = {};

function generateRandom(length) {
    return base64url(crypto.randomBytes(length));
  }

function calculateChallenge(codeVerifier) {
    const hash = crypto.createHash('sha256');
    hash.update(codeVerifier);
    const codeChallenge = base64url(hash.digest());
    return codeChallenge;
}

function generateAuthenticationParams() {
    const state = generateRandom(36);
    const codeVerifier = generateRandom(32);
    const codeChallenge = calculateChallenge(codeVerifier);
    return {
        state,
        codeVerifier,
        codeChallenge
    };
}

function getNSOLogin() {
    //get redirect url for login 
    authParams = generateAuthenticationParams();
    const params = {
      state: authParams.state,
      redirect_uri: 'npf71b963c1b7b6d119://auth&client_id=71b963c1b7b6d119',
      scope: 'openid%20user%20user.birthday%20user.mii%20user.screenName',
      response_type: 'session_token_code',
      session_token_code_challenge: authParams.codeChallenge,
      session_token_code_challenge_method: 'S256',
      theme: 'login_form'
    };
    const arrayParams = [];
    for (var key in params) {
      if (!params.hasOwnProperty(key)) continue;
      arrayParams.push(`${key}=${params[key]}`);
    }
    const stringParams = arrayParams.join('&');
    return `https://accounts.nintendo.com/connect/1.0.0/authorize?${stringParams}`;
}

//  const loginURL = getNSOLogin();
//  console.log(loginURL);

/*
redirect url format:
npf71b963c1b7b6d119://auth#session_state=[SessionStateReturned]&session_token_code=[SessionTokenCodeReturned]&state=[StateReturned]
*/



//1. get session token code
redirectURL = 'npf71b963c1b7b6d119://auth#session_state=1c9bfdbb09a355d30325e9f74d6a008df5bf291d3d613fa7a7fda9f546738783&session_token_code=eyJhbGciOiJIUzI1NiJ9.eyJzdGM6c2NwIjpbMCw4LDksMTcsMjNdLCJ0eXAiOiJzZXNzaW9uX3Rva2VuX2NvZGUiLCJhdWQiOiI3MWI5NjNjMWI3YjZkMTE5Iiwic3RjOm0iOiJTMjU2IiwiaWF0IjoxNjcwNzk4OTA1LCJzdGM6YyI6Im9zUXgxWGVJNzdTQnlZQ282cHlaenE5cG9xQVBDeHRlUVBuTmliYUhIbVkiLCJleHAiOjE2NzA3OTk1MDUsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMubmludGVuZG8uY29tIiwic3ViIjoiNDhiOTg0YzExMjMyZmQyMCIsImp0aSI6IjY2Mzg0ODMxNDU5In0.dbB8etvhFD4RC92yBlYoPQ2K5Eren0VfwKjQ8mBLVe4&state=IZKlDd4xhczCLdiQDsIcIBai7bLP_qEf1ZfEkdpVFvG2XhpP';
const params = {};

// extract three params from url 
// the sessionTokenCode is params.session_token_code
redirectURL.split('#')[1]
        .split('&')
        .forEach(str => {
          const splitStr = str.split('=');
          params[splitStr[0]] = splitStr[1];
        });
//console.log(params.session_token_code);
const request2 = require('request-promise-native');
const jar = request2.jar();
const request = request2.defaults({ jar: jar });


const userAgentVersion = `2.4.0`; // version of Nintendo Switch App, updated once or twice per year

async function getSessionToken(session_token_code, codeVerifier) {
  const resp = await request({
    method: 'POST',
    uri: 'https://accounts.nintendo.com/connect/1.0.0/api/session_token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Platform': 'Android',
      'X-ProductVersion': userAgentVersion,
      'User-Agent': `OnlineLounge/${userAgentVersion} NASDKAPI Android`
    },
    form: {
      client_id: '71b963c1b7b6d119',
      session_token_code: session_token_code,
      session_token_code_verifier: codeVerifier
    },
    json: true
  });

  return resp.session_token;
}

// 2. get webservice token

const { v4: uuidv4 } = require('uuid');

async function getWebServiceTokenWithSessionToken(sessionToken, game, id) {
    const apiTokens = await getApiToken(sessionToken); // I. Get API Token
    const userInfo = await getUserInfo(apiTokens.access); // II. Get userInfo
    const guid = uuidv4();
    const timestamp = String(Math.floor(Date.now() / 1000));
    const flapg_nso = await callFlapg(apiTokens.id, guid, timestamp, "nso"); // III. Get F flag [NSO] 
    const apiAccessToken = await getApiLogin(userInfo, flapg_nso); // IV. Get API Access Token
    const flapg_app = await callFlapg(apiAccessToken, guid, timestamp, "app"); // V. Get F flag [App]
    const web_service_token =  await getWebServiceToken(apiAccessToken, flapg_app, game); // VI. Get Web Service Token
    return web_service_token;
  }

  const userAgentString = `com.nintendo.znca/${userAgentVersion} (Android/7.1.2)`;

  async function getApiToken(session_token) {
      const resp = await request({
          method: 'POST',
          uri: 'https://accounts.nintendo.com/connect/1.0.0/api/token',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Platform': 'Android',
          'X-ProductVersion': userAgentVersion,
          'User-Agent': userAgentString
          },
          json: {
          client_id: '71b963c1b7b6d119',
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer-session-token',
          session_token: session_token
          }
      }); 
  
      return {
          id: resp.id_token,
          access: resp.access_token
      };
  }
  
  async function getHash(idToken, timestamp) {
    const response = await request({
      method: 'POST',
      uri: 'https://elifessler.com/s2s/api/gen2',
      headers: {
        'User-Agent': `yournamehere` // your unique id here
      },
      form: {
        naIdToken: idToken,
        timestamp: timestamp
      }
    });
  
    const responseObject = JSON.parse(response);
    return responseObject.hash;
  }

  async function getFlapgByImink(idToken) {
    const response = await request({
      method: 'POST',
      uri: 'https://api.imink.app/f',
      headers: {
        'User-Agent': `N-Connect/1.0.0` // your unique id here
      },
      body: {
        'token': idToken,
        'hash_method': 1
      },
      json: true
    });
    return response;
  }
  
  
  async function callFlapg(idToken, guid, timestamp, login) {
      const hash = await getHash(idToken, timestamp)
      const response = await request({
          method: 'GET',
          uri: 'https://flapg.com/ika2/api/login?public',
          headers: {
          'x-token': idToken,
          'x-time': timestamp,
          'x-guid': guid,
          'x-hash': hash,
          'x-ver': '3',
          'x-iid': login
          }
      });
      const responseObject = JSON.parse(response);
  
      return responseObject.result;
  }
  
  async function getUserInfo(token) {
  const response = await request({
      method: 'GET',
      uri: 'https://api.accounts.nintendo.com/2.0.0/users/me',
      headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Platform': 'Android',
      'X-ProductVersion': userAgentVersion,
      'User-Agent': userAgentString,
      Authorization: `Bearer ${token}`
      },
      json: true
  });
  
  return {
      nickname: response.nickname,
      language: response.language,
      birthday: response.birthday,
      country: response.country
  };
  }
  
  async function getApiLogin(userinfo, flapg_nso, id) {
      const resp = await request({
          method: 'POST',
          uri: 'https://api-lp1.znc.srv.nintendo.net/v2/Account/Login',
          headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Platform': 'Android',
          'X-ProductVersion': userAgentVersion,
          'User-Agent': userAgentString,
          Authorization: 'Bearer'
          },
          body: {
          parameter: {
              language: userinfo.language,
              naCountry: userinfo.country,
              naBirthday: userinfo.birthday,
              f: flapg_nso.f,
              naIdToken: id,
              timestamp: flapg_nso.timestamp,
              requestId: flapg_nso.request_id
          }
          },
          json: true,
          gzip: true
      });
      return resp.result.user;
      //return resp.result.webApiServerCredential.accessToken;
  }
  
  
  async function getWebServiceToken(token, flapg_app, game, id) {
    let parameterId;
      if (game == 'S2') {
        parameterId = 5741031244955648; // SplatNet 2 ID
      } else if (game == 'AC') {
        parameterId = 4953919198265344; // Animal Crossing ID
      }
    const resp = await request({
      method: 'POST',
      uri: 'https://api-lp1.znc.srv.nintendo.net/v2/Game/GetWebServiceToken',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Platform': 'Android',
        'X-ProductVersion': userAgentVersion,
        'User-Agent': userAgentString,
        Authorization: `Bearer ${token}`
      },
      json: {
        parameter: {
          id: parameterId,
          f: flapg_app.f,
          registrationToken: id,
          timestamp: flapg_app.timestamp,
          requestId: flapg_app.request_id
        }
      }
    });
  
    // return {
    //   accessToken: resp.result.accessToken,
    //   expiresAt: Math.round(new Date().getTime()) + resp.result.expiresIn
    // };
    return resp;
  }



  async function getUserNameByRedirectUrl(url) {





  }

// test part
(async () => {
    //  const loginURL = getNSOLogin();
    //  console.log(loginURL);
    //  console.log(authParams);

       const sessionToken = await getSessionToken(params.session_token_code, 'XPWLmttwH6GE7Uvzb69-8NQjzcNN6_XTqNdZHgZ5mHM');
       apiTokens = await getApiToken(sessionToken);
       const userInfo = await getUserInfo(apiTokens.access);
       console.log(userInfo);
       const flapg_nso = await getFlapgByImink(apiTokens.id);
       //console.log(flapg_nso);
       const apiAccessToken = await getApiLogin(userInfo, flapg_nso, apiTokens.id); // IV. Get API Access Token
       console.log(apiAccessToken);
      //  const webtoken = await getWebServiceToken(apiAccessToken, flapg_nso, 'S2', apiTokens.id);
      //  console.log(webtoken);
       //const webServiceToken = await getWebServiceTokenWithSessionToken(sessionToken, game='S2');
       //console.log('Web Service Token', webServiceToken);
})()


