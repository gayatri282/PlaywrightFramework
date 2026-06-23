
import { register } from 'node:module';
import { test, expect } from '../src/fixtures/pagefixtures'
import { csvHelper } from '../src/utils/csvHelper';
import { RegisterPage } from '../src/pages/RegisterPage';



test.beforeEach(async ({ registerPage }) => {
    await registerPage.goToRegister();
})

test('Register Account page title test', async ({ registerPage }) => {
    const pageTitle = await registerPage.registerPageTitle();
    console.log(`Register page title: ${pageTitle}`);
    expect(pageTitle).toBe('Register Account');
})

let testData = csvHelper.readCsv('src/testdata/registerdata.csv');
for (let row of testData) {
    test.skip(`Register Page with csv helper ${row.firstName}`, async ({ registerPage }) => {
        await registerPage.registerAccount(row.firstName, row.lastName, row.email, row.telephone, row.password, row.subscribe);
        expect(await registerPage.successMessage()).toBeTruthy();
    })
}