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
    return `https://accounts.nintendo.com/connect/1.0.0/authorize?${stringParams}`;
}