import { Apihelper } from '../../src/api/ApiHelper';
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

test('delete api test', async ({ apiHelper }) => {
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

    let delResponse = await apiHelper.delete(`/public/v2/users/${userid}`, AUTH_HEADER);
    console.log("status: ", delResponse.status);
    expect(response.status).toBe(204);
})

test('update api test', async ({ apiHelper }) => {
    let userdata = {
        'name': "SuGa",
        'email': `api_${Date.now()}@testing.com`,
        'gender': 'male',
        'status': 'inactive'
    }

    let response = await apiHelper.post('/public/v2/users', userdata, AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('SuGa');
    console.log("email before update: ", response.body.email);
    let userid = response.body.id;

    let updateData= {
        'email':`Suga_${Date.now()}@testing.com`
    }

    let updateResponse = await apiHelper.patch(`/public/v2/users/${userid}`,updateData,AUTH_HEADER);

    expect(updateResponse.status).toBe(200);
    console.log("updated email: ", updateResponse.body.email);
})
