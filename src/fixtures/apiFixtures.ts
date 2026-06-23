import {test as baseTest} from '@playwright/test'
import { Apihelper } from '../api/ApiHelper'

type ApiFixtures = {
    apiHelper: Apihelper;
}

export let test = baseTest.extend<ApiFixtures>({
    apiHelper: async ({request}, use)=>{
        let apiHelper= new Apihelper(
            request,
            process.env.API_BASE_URL!
        );
        await use(apiHelper);
    }
})

export {expect} from '@playwright/test'