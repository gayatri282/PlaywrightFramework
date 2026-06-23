

import { test, expect } from '../src/fixtures/pagefixtures'


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin('testing123@email.com', 'test@123');
})

test('Home page title ', async ({ homePage }) => {
    const pageTitle = await homePage.getHomepageTitle();
    console.log(`login page title: ${pageTitle}`);
    expect(pageTitle).toBe('My Account');
})

test('logout link exist', async ({ homePage }) => {
    expect(await homePage.isLogoutExist()).toBeTruthy();
})

test('Home page headers', async ({ homePage }) => {
    let allHeaders = await homePage.homePageHeaders();
    console.log("homepage headers: " + allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
})

test('Currency check', async ({homePage}) => {
    expect(await homePage.currencyCheck()).toBe('Currency');
})