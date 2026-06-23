import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class SearchResultsPage extends BasePage {
    private readonly searchResults: Locator;

    constructor(page: Page) {
        super(page);
        this.searchResults = page.locator('div.product-thumb');
    }

    async getResultsCount(): Promise<Number>{
        return await this.searchResults.count();
    }

    async selectProduct(productName: string): Promise<void>{
        return await this.page.getByRole('link',{name: 'Macbook'}).first().click();
    }
}