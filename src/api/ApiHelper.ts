import { APIRequestContext } from "@playwright/test";


export class Apihelper {
    private readonly request: APIRequestContext;
    private readonly baseURL: string;

    constructor(request: APIRequestContext, baseURL: string) {
        this.request = request;
        this.baseURL = baseURL;
    }

    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {
            data: data,
            headers: headers
        });
        console.log('response: ',await response.json());
        return {
            status: response.status(),
            body: await response.json()
        }
    }
}