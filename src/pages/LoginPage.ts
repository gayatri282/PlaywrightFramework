import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage {
    //private locators
    private readonly emailid: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgotPassword: Locator;
    private readonly invalidCredError: Locator;

    //init the locators 
    constructor(page: Page) {
        super(page);
        this.emailid = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgotPassword = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.invalidCredError = page.locator('.alert.alert-danger.alert-dismissible');
    }

    async goToLoginPage() {
        await this.page.goto("opencart/index.php?route=account/login");
    }

    async getLoginPageTitle() {
        return await this.page.title();
    }

    async isForgotpasswordLink() {
        return await this.forgotPassword.isVisible();
    }

    async doLogin(username: string, password: string) {
        console.log(`user creds: ${username} : ${password}`);
        await this.emailid.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async logoCheck(): Promise<boolean> {
        return await this.logo.isVisible();
    }

    async invalidCredErrorCheck(): Promise<boolean> {
        return await this.invalidCredError.isVisible();
    }

}