import test, { expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";
import { csvHelper } from "../src/utils/csvHelper";

let loginPage: LoginPage;
let homepage: HomePage;

// creds: testing123@email.com, test@123
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homepage = new HomePage(page);
})


test('Login page title ', async ({ }) => {
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log(`login page title: ${pageTitle}`);
    expect(pageTitle).toBe('Account Login');
})

test('forgot Password link exist', async ({ }) => {
    expect(await loginPage.isForgotpasswordLink()).toBeTruthy();
})

test('logo', ({ }) => {
    expect(loginPage.logoCheck).toBeTruthy();
})

test('do login', async ({ }) => {
    await loginPage.doLogin('testing123@email.com', 'test@123');
    expect.soft(await homepage.isLogoutExist()).toBeTruthy();
})


