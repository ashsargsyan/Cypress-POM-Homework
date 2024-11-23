import LoginPage from "../../Pages/LoginPage";
import AdminPage from "../../Pages/AdminPage";
import SidePanel from "../../Pages/SidePanel";
import {Constants} from "../../../Constants/Constants";

describe('Resetting User Password', () => {
    it('Resetting User Password', () => {
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
        adminPage.resetPassword(Constants.resetNewPassword);
        adminPage.clickToSaveBtn();
        adminPage.assertSuccessMessage();
        adminPage.selectUser(Constants.newUsername);
        adminPage.deleteUser();
        adminPage.verifyDeletedUserNotVisible(Constants.newUsername);
    });
});
