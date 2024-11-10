import LoginPage from "../Pages/LoginPage";
import AdminPage from "../Pages/AdminPage";
import SidePanel from "../Pages/SidePanel";
import {Constants , users} from "../../Constants/Constants";


describe("Bulk User Creation and Validation", function() {
    it('Register multiple users and validate the data ', () => {
        const loginPage = new LoginPage();
        const adminPage = new AdminPage();
        const sidePanel = new SidePanel();

        loginPage.open();
        loginPage.login(Constants.adminUserName, Constants.adminPassword);
        loginPage.assertSuccessLogin();

        sidePanel.openAdminPage();

        adminPage.navigateToUserManagement();

        users.forEach((user) => {
            adminPage.clickToAddButton();
            adminPage.addUser(user.username, user.password, user.role, user.employeeName, user.status);
            adminPage.clickToSaveBtn();
            adminPage.assertSuccessMessage();
        });

        cy.wait(2500);

        users.forEach((user) => {
            adminPage.searchUserByUsername(user.username);
            adminPage.verifyThatUserAdded(user.username);
            adminPage.verifyRoleUpdated(user.username, user.role);
            adminPage.verifyEmployeeNameAdded(user.username, user.employeeName);
            adminPage.verifyThatStatusUpdated(user.username, user.status);
        });
    });
})
