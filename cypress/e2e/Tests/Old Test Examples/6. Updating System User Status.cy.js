import LoginPage from "../../Pages/LoginPage";
import AdminPage from "../../Pages/AdminPage";
import SidePanel from "../../Pages/SidePanel";
import {Constants} from "../../../Constants/Constants";

describe('Updating System User status', () => {
    it('Updating System User status', () => {
        const loginPage = new LoginPage();
        const adminPage = new AdminPage();
        const sidePanel = new SidePanel();

        loginPage.open();
        loginPage.login(Constants.adminUserName, Constants.adminPassword);
        loginPage.assertSuccessLogin();

        sidePanel.openAdminPage();

        adminPage.navigateToUserManagement();
        adminPage.clickToAddButton();
        adminPage.addUser(Constants.newUsername, Constants.newPassword, Constants.role, Constants.employeeName, Constants.status);
        adminPage.clickToSaveBtn();
        adminPage.assertSuccessMessage();
        adminPage.verifyThatUserAdded(Constants.newUsername);
        adminPage.searchUserByUsername(Constants.newUsername);
        adminPage.clickToEditBtn();
        adminPage.editUserStatus(Constants.updatedStatus);
        adminPage.clickToSaveBtn();
        adminPage.assertSuccessMessage();
        adminPage.verifyThatStatusUpdated(Constants.newUsername, Constants.updatedStatus);
        adminPage.selectUser(Constants.newUsername);
        adminPage.deleteUser();
        adminPage.verifyDeletedUserNotVisible(Constants.newUsername);
    });
});
