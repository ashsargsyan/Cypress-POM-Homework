import LoginPage from "../Pages/LoginPage";
import AdminPage from "../Pages/AdminPage";
import SidePanel from "../Pages/SidePanel";
import {Constants} from "../../Constants/Constants";

describe('Deleting a User', () => {
    it('User should be deleted', () => {
        const loginPage = new LoginPage();
        const adminPage = new AdminPage();
        const sidePanel = new SidePanel();

        loginPage.open();
        loginPage.login(Constants.adminUserName, Constants.adminPassword);
        loginPage.assertSuccessLogin();

        sidePanel.openAdminPage();

        adminPage.navigateToUserManagement();
        adminPage.searchUserByUsername(Constants.newUsername);
        adminPage.selectUser(Constants.newUsername);
        adminPage.deleteUser();
        adminPage.verifyDeletedUserNotVisible(Constants.newUsername);
    });
})
