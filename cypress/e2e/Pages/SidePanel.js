import {sidePanelLocators} from "../../Locators/SidePanelLocators";

class SidePanel {
    openAdminPage() {
        cy.get(sidePanelLocators.admin).click();
    }

    verifyAdminNotVisible() {
        cy.get(sidePanelLocators.admin).should('not.exist');
    }

    searchInSidePanel(page) {
        cy.get(sidePanelLocators.search).type(page);
    }
}

export default SidePanel;
