
import {test, expect} from '@playwright/test'

test('intercept request', async ({page})=>{
    await page.route('**/*', async(route)=>{
        console.log(route.request().url(), route.request().method());
        await route.continue();
    })
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
})