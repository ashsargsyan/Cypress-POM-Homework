import {loginLocators} from "../../Locators/LoginLocators";
import {HeaderLocators} from "../../Locators/HeaderLocators";

class LoginPage {

    login(username, password) {
        cy.get(loginLocators.username).type(username);
        cy.get(loginLocators.password).type(password);
        cy.get(loginLocators.loginBtn).click();
    }

    assertSuccessLogin() {
        cy.url().should('include', 'dashboard');
        cy.get(HeaderLocators.usernameDropdown).should('be.visible');
    }
}

export default LoginPage
