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

    it('Validating User Role Permissions', () => {
        loginPage.open();
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

        header.logOut()

        loginPage.login(Constants.newUsername2, Constants.newPassword);
        loginPage.assertSuccessLogin();

        sidePanel.searchInSidePanel(Constants.filteredRole);
        sidePanel.verifyAdminNotVisible();

        adminPage.verifyThatUserManagementNotAvailable();
        header.logOut();
        loginPage.login(Constants.adminUserName, Constants.adminPassword);
        loginPage.assertSuccessLogin();
        sidePanel.openAdminPage();
        adminPage.navigateToUserManagement();
        adminPage.searchUserByUsername(Constants.newUsername2);
        adminPage.selectUser(Constants.newUsername2);
        adminPage.deleteUser();
        adminPage.verifyDeletedUserNotVisible(Constants.newUsername2);
    });
})
