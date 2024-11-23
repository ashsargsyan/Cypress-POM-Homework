import LoginPage from "../../Pages/LoginPage";
import AdminPage from "../../Pages/AdminPage";
import Header from "../../Pages/Header";
import SidePanel from "../../Pages/SidePanel";
import {Constants} from "../../../Constants/Constants";

describe('Validating User Role Permissions', () => {
    const loginPage = new LoginPage();
    const adminPage = new AdminPage();
    const header = new Header();
    const sidePanel = new SidePanel();

    beforeEach(() => {
        loginPage.open();
        cy.wait(1000);
    })

    it('Validating User Role Permissions', () => {
        loginPage.login(Constants.adminUserName, Constants.adminPassword);
        loginPage.assertSuccessLogin();

        sidePanel.openAdminPage();

        adminPage.navigateToUserManagement();
        adminPage.clickToAddButton();
        adminPage.addUser(Constants.newUsername2,
            Constants.newPassword,
            Constants.role,
            Constants.employeeName,
            Constants.status);
        adminPage.clickToSaveBtn();
        adminPage.assertSuccessMessage();
        adminPage.verifyThatUserAdded(Constants.newUsername2);

        header.logOut();
    });

    it('Login with new user and check role permissions', () => {
        loginPage.login(Constants.newUsername2, Constants.newPassword);
        loginPage.assertSuccessLogin();

        sidePanel.searchInSidePanel(Constants.filteredRole);
        sidePanel.verifyAdminNotVisible();

        adminPage.verifyThatUserManagementNotAvailable();
    });
})
