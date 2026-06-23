import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfo extends BasePage {
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly addToCart: Locator;
    private readonly viewCart: Locator;
    private map: Map<string, string | number>;


    constructor(page: Page) {
        super(page);
        this.header = page.locator('h1');
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.addToCart = page.getByRole('button',{name:'Add to Cart'});
        this.viewCart = page.getByText('View Cart');
        this.map = new Map<string, string>();
    }

    async productHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImageCount(): Promise<number> {
        //using wait for elements to get load
        await this.productImages.first().waitFor({ state: 'visible' });
        return await this.productImages.count();
    }

    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.set('Product header', await this.productHeader());
        this.map.set('Product Images', await this.getProductImageCount());
        await this.getProductPricingData();
        await this.getProductMetaData();
        return this.map;
    }

    // using map for the data
    //Brand: Apple
    //Product Code: Product 18
    //Reward Points: 800
    //Availability: Out Of Stock
    private async getProductMetaData() {
        let metaData = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.map.set(metaKey, metaValue);
        }
    }

    private async getProductPricingData() {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('productPrice', productPrice);
        this.map.set('exTaxPrice', exTaxPrice);
    }

    public async addProduct(){
        await this.addToCart.click();
        await this.cartButton.click();
        await this.viewCart.click();
    }

}