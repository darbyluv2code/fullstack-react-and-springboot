export const oktaConfig = {
    clientId: '<CLIENTID HERE>',
    issuer: 'https://dev-<DEV ID>.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}