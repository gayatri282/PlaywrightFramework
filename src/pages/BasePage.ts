import { Locator, Page } from "@playwright/test";


export class BasePage {
    //common locators accross the page
    protected readonly page: Page;
    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = this.page.getByAltText('naveenopencart');
        this.searchBox = this.page.getByPlaceholder('Search');
        this.searchIcon = page.locator('div#search button');
        this.footerLinks = page.locator('.row ul li');
        this.currency = page.getByText('Currency', { exact: true });
        this.cartButton = page.locator('#cart-total');
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    getCurrentUrl(): string {
        return this.page.url();
    }

    async footerLinksCount() {
        return await this.footerLinks.count();
    }

    async currencyCheck() {
        return this.currency.textContent();
    }


}