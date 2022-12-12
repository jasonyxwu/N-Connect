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

export function getNSOLogin() {
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
    return {url:`https://accounts.nintendo.com/connect/1.0.0/authorize?${stringParams}`, codeVerifier: authParams.codeVerifier};
}


const request2 = require('request-promise-native');
const jar = request2.jar();
const request = request2.defaults({ jar: jar });
const userAgentVersion = `2.4.0`; // version of Nintendo Switch App, updated once or twice per year
async function getSessionToken(session_token_code, codeVerifier) {
    const resp = await request({
      method: 'POST',
      uri: 'https://calm-cove-04963.herokuapp.com/https://accounts.nintendo.com/connect/1.0.0/api/session_token',
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

const userAgentString = `com.nintendo.znca/${userAgentVersion} (Android/7.1.2)`;

async function getApiToken(session_token) {
    const resp = await request({
        method: 'POST',
        uri: 'https://calm-cove-04963.herokuapp.com/https://accounts.nintendo.com/connect/1.0.0/api/token',
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

async function getUserInfo(token) {
    const response = await request({
        method: 'GET',
        uri: 'https://calm-cove-04963.herokuapp.com/https://api.accounts.nintendo.com/2.0.0/users/me',
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

async function getFlapgByImink(idToken) {
    const response = await request({
      method: 'POST',
      uri: 'https://calm-cove-04963.herokuapp.com/https://api.imink.app/f',
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

async function getApiLogin(userinfo, flapg_nso, id) {
    const resp = await request({
        method: 'POST',
        uri: 'https://calm-cove-04963.herokuapp.com/https://api-lp1.znc.srv.nintendo.net/v2/Account/Login',
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
        //gzip: true
        deflate:true
    });
    return resp.result.user.name;
    //return resp.result.webApiServerCredential.accessToken;
}

export async function getUserNameByRedirectUrl(url, codeVerifier) {
    const params = {};
    var name;
    // extract three params from url 
    // the sessionTokenCode is params.session_token_code
    url.split('#')[1]
            .split('&')
            .forEach(str => {
            const splitStr = str.split('=');
            params[splitStr[0]] = splitStr[1];
            });
    const sessionToken = await getSessionToken(params.session_token_code, codeVerifier);
    var apiTokens = await getApiToken(sessionToken);
    const userInfo = await getUserInfo(apiTokens.access);
    console.log(userInfo);
    const flapg_nso = await getFlapgByImink(apiTokens.id);
    console.log(flapg_nso);
    const apiAccessToken = await getApiLogin(userInfo, flapg_nso, apiTokens.id); // IV. Get API Access Token
    //console.log(apiAccessToken);
    return apiAccessToken;
}