import LoginPage from "../Pages/LoginPage";
import AdminPage from "../Pages/AdminPage";
import SidePanel from "../Pages/SidePanel";
import {Constants} from "../../Constants/Constants";

describe('Updating System User status', () => {
    it('User Status should be updated', () => {
        const loginPage = new LoginPage();
        const adminPage = new AdminPage();
        const sidePanel = new SidePanel();

        loginPage.open();
        loginPage.login(Constants.adminUserName, Constants.adminPassword);
        loginPage.assertSuccessLogin();

        sidePanel.openAdminPage();

        adminPage.navigateToUserManagement();
        adminPage.searchUserByUsername(Constants.newUsername);
        adminPage.clickToEditBtn();
        adminPage.editUserStatus(Constants.updatedStatus);
        adminPage.clickToSaveBtn();
        adminPage.assertSuccessMessage();
        adminPage.verifyThatStatusUpdated(Constants.newUsername, Constants.updatedStatus);
    });
});
