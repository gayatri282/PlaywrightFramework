import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage"


export class HomePage extends BasePage {
    private readonly logout: Locator;
    private readonly headers: Locator;

    constructor(page: Page) {
        super(page);
        this.logout = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
    }

    async getHomepageTitle() {
        return await this.page.title();
    }

    async isLogoutExist() {
        return await this.logout.isVisible();
    }

    async homePageHeaders() {
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchKey: string) {
        await this.searchBox.fill(searchKey);
        await this.searchIcon.click();
    }
}