import test from "@playwright/test";

let AUTH_TOKEN = { Authorization: 'Bearer 425da840cf3e15fc1830150361d4f13be8bc28f12d9469cfe80cf8c6ab2ce2bf' };

test('get user test', async ({ request }) => {
    let response = await request.get('https://gorest.co.in/public/v2/users/8501924', {
        headers: AUTH_TOKEN
    });
    //console.log("response: ", response);
    let jsonbody = await response.json();
    console.log("json body", jsonbody);
    console.log("response status ", response.status());
    console.log("response status ", response.statusText());
})

test('create user using api', async ({ request }) => {
    let userdata = {
        "name": "G3 API",
        "email": `g3_api${Date.now()}@apitest.com`,
        "gender": "female",
        "status": "active"
    }
    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userdata
    });

    let jsonbody = await response.json();
    console.log('jsonbody: ', jsonbody);
    console.log("response code ", response.status());
    console.log("response status ", response.statusText());
})

test('update user using API', async ({ request }) => {
    let userdata = {
        "name": "SG API",
        "gender": "male",
    }
    let response = await request.put('https://gorest.co.in/public/v2/users/8502286', {
        headers: AUTH_TOKEN,
        data: userdata
    })
    let jsonbody = await response.json();
    console.log(jsonbody);
    console.log("code: " + response.status());
    console.log("response status: " + response.statusText());
})


test('delete user using api', async ({ request }) => {
    let response = await request.delete('https://gorest.co.in/public/v2/users/8505812', {
        headers: AUTH_TOKEN
    })
   // let jsonbody = await response.json();
    //console.log(jsonbody);
    console.log("code: " + response.status());
    console.log("response status: " + response.statusText());
})


test('create a user,get user and delete a user',async ({request})=>{
     let userdata = {
        "name": "GG API",
        "email": `gs_api${Date.now()}@apitest.com`,
        "gender": "female",
        "status": "active"
    }
    let response = await request.post('https://gorest.co.in/public/v2/users',{
        headers: AUTH_TOKEN,
        data: userdata,
    })

    let jsonbody = await response.json();
    console.log('created user',jsonbody);
    console.log("user id", jsonbody.id);

    let getResponse = await request.get(`https://gorest.co.in/public/v2/users/${jsonbody.id}`, {
        headers: AUTH_TOKEN
    });
    
    let getjsonbody = await getResponse.json();
    console.log('get user:',getjsonbody);
 
    
    console.log("response code during creation: " + response.status());
    console.log("response status during creation: " + response.statusText());

    let deleteResponse = await request.delete(`https://gorest.co.in/public/v2/users/${jsonbody.id}`, {
        headers: AUTH_TOKEN
    });

    console.log("response code during deletion: " + deleteResponse.status());
    console.log("response status during deletion: " + deleteResponse.statusText());

    let getResponseafterdeletion = await request.get(`https://gorest.co.in/public/v2/users/${jsonbody.id}`, {
        headers: AUTH_TOKEN
    });
    
    let getjsonbodyafterdeletion = await getResponseafterdeletion.json();
    console.log('get user after deletion:',getjsonbodyafterdeletion);
})
