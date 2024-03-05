export const oktaConfig = {

    clientId: '0oaeqvk5uhQHBr77y5d7',

    issuer: 'https://dev-73698383.okta.com/oauth2/default',

    redirectUri: 'http://localhost:3000/login/callback',

    scopes: ['openid', 'profile', 'email'],

    pkce: true,

    disableHttpsCheck: true,


}