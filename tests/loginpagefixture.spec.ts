import { test, expect } from '../src/fixtures/pagefixtures'
import { csvHelper } from '../src/utils/csvHelper';
import { ExcelHelper } from '../src/utils/Excelhelper';
import { JsonHelper } from '../src/utils/JsonHelper';


// creds: testing123@email.com, test@123
test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
})


test('Login page title ', async ({ loginPage }) => {
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log(`login page title: ${pageTitle}`);
    expect(pageTitle).toBe('Account Login');
})

test('forgot Password link exist', async ({ loginPage }) => {
    expect(await loginPage.isForgotpasswordLink()).toBeTruthy();
})

test('logo', ({ loginPage }) => {
    expect(loginPage.logoCheck).toBeTruthy();
})

test('do login', async ({ loginPage, homePage }) => {
    console.log(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    expect.soft(await homePage.isLogoutExist()).toBeTruthy();
})

test('Invalid creds check', async ({ loginPage, testData }) => {
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidCredErrorCheck()).toBeTruthy();
    }
})

let testData = csvHelper.readCsv('src/testdata/logindata.csv')
for (let row of testData) {
    test(`invalid creds check with data ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidCredErrorCheck()).toBeTruthy();
    })
}

let testDataxl = ExcelHelper.readExcel('src/testdata/logintestdata.xlsx')
for (let row of testDataxl) {
    test(`invalid login test with excel test data ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidCredErrorCheck()).toBeTruthy();
    })
}

let testDataJson = JsonHelper.readJson('src/testdata/login.json')
for (let row of testDataJson) {
    test(`invalid login test with json test data ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.invalidCredErrorCheck()).toBeTruthy();
    })
}

test('footer links check', async({loginPage})=>{
    expect(await loginPage.footerLinksCount()).toBe(16);
})


