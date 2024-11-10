import LoginPage from "../Pages/LoginPage";
import AdminPage from "../Pages/AdminPage";
import SidePanel from "../Pages/SidePanel";
import {Constants} from "../../Constants/Constants";

describe('Add User Mandatory Fields and Validation Messages', () => {
    it('in Add a User section Check fill the fields with valid and invalid data' +
        ' to check error messages', () => {
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
        adminPage.addUser(Constants.newUsername,
            Constants.newPassword,
            Constants.role,
            Constants.employeeName,
            Constants.status);
        adminPage.verifyErrorMessageNotVisible();
        adminPage.clickToSaveBtn();
        adminPage.assertSuccessMessage();
        adminPage.verifyThatUserAdded(Constants.newUsername);
    });
})
