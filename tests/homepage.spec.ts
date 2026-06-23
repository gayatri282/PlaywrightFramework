
import test, { expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homepage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('testing123@email.com', 'test@123');
    homepage = new HomePage(page);
})

test('Home page title ', async ({ }) => {
    const pageTitle = await homepage.getHomepageTitle();
    console.log(`login page title: ${pageTitle}`);
    expect(pageTitle).toBe('My Account');
})

test('logout link exist', async ({ }) => {
    expect(await homepage.isLogoutExist()).toBeTruthy();
})

test('Home page headers', async ({ }) => {
    let allHeaders = await homepage.homePageHeaders();
    console.log("homepage headers: " + allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
})