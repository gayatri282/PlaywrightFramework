import { test, expect } from '../src/fixtures/pagefixtures'
import { HomePage } from '../src/pages/HomePage';


// creds: testing123@email.com, test@123
test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
})


test('verify the product data', async ({ homePage, searchPage, productInfo }) => {
    await homePage.doSearch('Macbook');
    await searchPage.selectProduct('Macbook Pro');
    let imgcount = await productInfo.getProductImageCount();
    expect(imgcount).toBe(5);
})

test('verify product information data', async ({ homePage, searchPage, productInfo }) => {
    await homePage.doSearch('Macbook');
    await searchPage.selectProduct('Macbook Pro');
    let actualProductInfo = await productInfo.getProductInfo();
    console.log('Product Info: ', actualProductInfo);
    expect.soft(actualProductInfo.get('Product header')).toBe('MacBook');
    expect.soft(actualProductInfo.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfo.get('Availability')).toBe('Out Of Stock');
    expect.soft(actualProductInfo.get('Reward Points')).toBe('600');
})

test('Add product to cart @test', async ({ homePage, searchPage, productInfo }) => {
    await homePage.doSearch('Macbook');
    await searchPage.selectProduct('Macbook Pro');
    await productInfo.addProduct();
    expect(await productInfo.getPageTitle()).toBe('Shopping Cart');
})
