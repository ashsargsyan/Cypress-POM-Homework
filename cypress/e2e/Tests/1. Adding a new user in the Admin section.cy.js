import LoginPage from "../Pages/LoginPage";
import AdminPage from "../Pages/AdminPage";
import SidePanel from "../Pages/SidePanel";
import {Constants} from "../../Constants/Constants";

describe('Adding a new user in the Admin section', () => {
  it('Should be added users', () => {
    const loginPage = new LoginPage();
    const adminPage = new AdminPage();
    const sidePanel = new SidePanel();

    loginPage.open();
    loginPage.login(Constants.adminUserName, Constants.adminPassword);
    loginPage.assertSuccessLogin();

    sidePanel.openAdminPage();

    adminPage.navigateToUserManagement();
    adminPage.clickToAddButton();
    adminPage.addUser(Constants.newUsername,
        Constants.newPassword,
        Constants.role,
        Constants.employeeName,
        Constants.status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(Constants.newUsername);
  })
})
