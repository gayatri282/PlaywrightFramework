
import { test, expect } from '../src/fixtures/pagefixtures'
import { HomePage } from '../src/pages/HomePage';


// creds: testing123@email.com, test@123
test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
})

test("verify search results count", async ({ homePage, searchPage }) => {
    await homePage.doSearch('macbook');
    expect(await searchPage.getResultsCount()).toBe(3);
})
