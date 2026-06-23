import { test, expect } from '../../src/fixtures/apiFixtures'

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };


test('post api test', async ({ apiHelper }) => {
    let userdata = {
        "name": "GG API",
        "email": `g3_api${Date.now()}@apitesting.com`,
        "gender": "female",
        "status": "active"
    }
    let response = await apiHelper.post('/public/v2/users', userdata, AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userdata.name);
    let userid = response.body.id;
    console.log("user id ", userid);
});
