import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continue: Locator;
    private readonly success: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone = page.getByRole('textbox', { name: 'Telephone' });
        this.password = page.getByRole('textbox', { name: '* Password', exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: 'Password Confirm' });
        this.privacyPolicy = page.locator('[name="agree"]');
        this.continue = page.getByRole('button', { name: 'Continue' });
        this.success = page.getByRole('link', { name: 'Success' })
    }
    async subscribeOption(option: string){
        return this.page.getByRole('radio', { name: `${option}` });
    }
    async goToRegister() {
        await this.page.goto('opencart/index.php?route=account/register');
    }
    async registerAccount(firstname: string, lastName: string, email: string,
        telephone: string, password: string, subscribe: string) {
        await this.firstName.fill(firstname)
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.confirmPassword.fill(password);
        await this.subscribeOption(subscribe);
        await this.privacyPolicy.click();
        await this.continue.click();
    }
    async successMessage() {
        return await this.success.isVisible();
    }
    async registerPageTitle() {
        return await this.page.title();
    }

}