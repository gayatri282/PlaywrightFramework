import { test, expect } from '../../src/fixtures/apiFixtures'

import Ajv from "ajv";

const TOKEN = process.env.API_TOKEN!;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };

let ajv = new Ajv();
let userschema ={
    
}