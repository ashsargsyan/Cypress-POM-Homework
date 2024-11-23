import LoginPage from "../../Pages/LoginPage";
import AdminPage from "../../Pages/AdminPage";
import SidePanel from "../../Pages/SidePanel";
import {Constants} from "../../../Constants/Constants";

describe('Add User Mandatory Fields and Validation Messages', () => {
    it('Add User Mandatory Fields and Validation Messages', () => {
        const loginPage = new LoginPage();
        const adminPage = new AdminPage();
        const sidePanel = new SidePanel();

        loginPage.open();
        loginPage.login(Constants.adminUserName, Constants.adminPassword);
        loginPage.assertSuccessLogin();

        sidePanel.openAdminPage();

        adminPage.navigateToUserManagement();
        adminPage.clickToAddButton();
        adminPage.clickToSaveBtn();
        adminPage.verifyErrorMessageVisible(Constants.userrole);
        adminPage.verifyErrorMessageVisible(Constants.employeename);
        adminPage.verifyErrorMessageVisible(Constants.statusfield);
        adminPage.verifyErrorMessageVisible(Constants.usernamefield);
        adminPage.verifyErrorMessageVisible(Constants.passwordfield);
        adminPage.verifyErrorMessageVisible(Constants.confirmPasswordfield);
        adminPage.addUser(Constants.newUsername, Constants.newPassword, Constants.role, Constants.employeeName, Constants.status);
        adminPage.verifyErrorMessageNotVisible(Constants.userrole);
        adminPage.verifyErrorMessageNotVisible(Constants.employeename);
        adminPage.verifyErrorMessageNotVisible(Constants.statusfield);
        adminPage.verifyErrorMessageNotVisible(Constants.usernamefield);
        adminPage.verifyErrorMessageNotVisible(Constants.passwordfield);
        adminPage.verifyErrorMessageNotVisible(Constants.confirmPasswordfield);
        adminPage.clickToSaveBtn();
        adminPage.assertSuccessMessage();
        adminPage.verifyThatUserAdded(Constants.newUsername);
        adminPage.selectUser(Constants.newUsername);
        adminPage.deleteUser();
        adminPage.verifyDeletedUserNotVisible(Constants.newUsername);
    });
})
