import {HeaderLocators} from "../../Locators/HeaderLocators";

class Header {
    logOut() {
        cy.get(HeaderLocators.usernameDropdown).click();
        cy.get(HeaderLocators.logout).last().click();
    }
}

export default Header;
