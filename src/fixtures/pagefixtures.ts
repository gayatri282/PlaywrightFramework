
import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage'
import { csvHelper } from '../utils/csvHelper';
import { SearchResultsPage } from '../pages/searchResults';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductInfo } from '../pages/ProductInfo';

type pageFixtures = {
    loginPage: LoginPage,
    homePage: HomePage,
    searchPage: SearchResultsPage,
    registerPage: RegisterPage,
    productInfo: ProductInfo,
    testData: Record<string, string>[]
}

export let test = baseTest.extend<pageFixtures>({
    loginPage: async ({ page }, use) => {
        let loginpage = new LoginPage(page);
        await use(loginpage);
    },

    homePage: async ({ page }, use) => {
        let homepage = new HomePage(page);
        await use(homepage);
    },

    searchPage: async ({ page }, use) => {
        let searchPage = new SearchResultsPage(page);
        await use(searchPage);
    },

    registerPage: async ({ page }, use) => {
        let registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    productInfo: async ({ page }, use) => {
        let productInfo = new ProductInfo(page);
        await use(productInfo);
    },

    testData: async ({ }, use) => {
        let testData = csvHelper.readCsv('src/testdata/logindata.csv');
        await use(testData);
    }
})

export { expect } from '@playwright/test';