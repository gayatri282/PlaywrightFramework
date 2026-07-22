import { Apihelper } from '../../src/api/ApiHelper';
import { test, expect } from '../../src/fixtures/apiFixtures'

import Ajv from "ajv";

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

let ajv = new Ajv();
let userschema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
}

let userArraySchema = {
    "type": "array",
    "items": userschema
}

test('validte schema for api', async ({ apiHelper }) => {

    let userdata = {
        "name": "G3 API",
        "email": `g3_api${Date.now()}@apitest.com`,
        "gender": "female",
        "status": "active"
    }

    let response = await apiHelper.post('/public/v2/users', userdata, AUTH_HEADER);

    let id = response.body.id;
    console.log(id);

    let getResponse = await apiHelper.get(`/public/v2/users/${id}`, AUTH_HEADER);

    console.log('response status: ', getResponse.status);
    expect(getResponse.status).toBe(200);

    let validate = ajv.compile(userschema);
    let isSchemaValid = validate(getResponse.body);

    if (!isSchemaValid) {
        console.log("Schema errrors: ", validate.errors);
    }

    expect(isSchemaValid).toBeTruthy();

})

test('validate all users schema', async ({ apiHelper }) => {
    let getResponse = await apiHelper.get(`/public/v2/users/`, AUTH_HEADER);

    console.log('response status: ', getResponse.status);
    expect(getResponse.status).toBe(200);

    let validate =ajv.compile(userArraySchema);
    let validSchema = validate(getResponse.body);

    if(!validSchema)
        console.log('Schema error:', validate.errors);

    expect(validSchema).toBeTruthy();
})