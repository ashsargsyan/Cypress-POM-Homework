import LoginPage from "../../Pages/LoginPage";
import AdminPage from "../../Pages/AdminPage";
import SidePanel from "../../Pages/SidePanel";
import {Constants} from "../../../Constants/Constants";

describe('Editing an existing user role', () => {
    it('Editing an existing user role', () => {
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
        adminPage.editExistingUserRole(Constants.filteredRole);
        adminPage.clickToSaveBtn();
        adminPage.assertSuccessMessage();
        adminPage.verifyRoleUpdated(Constants.newUsername, Constants.filteredRole);
        adminPage.selectUser(Constants.newUsername);
        adminPage.deleteUser();
        adminPage.verifyDeletedUserNotVisible(Constants.newUsername);
    });
})
