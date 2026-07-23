import { test, expect } from '@playwright/test'

let OAUTH_CONFIG = {
    tokenURL: 'https://test.api.amadeus.com/v1/security/oauth2/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.OAUTH_GRANT_TYPE!
}

test.skip('POST-generate access token', async ({ request }) => {
    let response = await request.post(OAUTH_CONFIG.tokenURL,{
        form:{
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    })

    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    console.log("json response: "+jsonResponse);
})