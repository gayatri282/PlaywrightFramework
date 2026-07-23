
import { test, expect } from '@playwright/test'

test('intercept request', async ({ page }) => {
    await page.route('**/*', async (route) => {
        console.log(route.request().url(), route.request().method());
        await route.continue();
    })
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
})

test('Mock data search', async ({ page }) => {
    let fakeProducts = [
        { name: 'fake MacBook', price: '$2000.00' },
        { name: 'fake Iphone', price: '$150.00' }
    ]

    await page.route('**/index.php?route=product/search&search=macbook', async (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts),
        });
    })

    await page.goto('https://naveenautomationlabs.com/index.php?route=product/search&search=macbook');

    let fakejson = await page.evaluate(async () => {
        let response = await fetch('https://naveenautomationlabs.com/index.php?route=product/search&search=macbook');
        return await response.json();
    })
    console.log('fake response: ', fakejson);
})