import LoginPage from "../../Pages/LoginPage";
import AdminPage from "../../Pages/AdminPage";
import Header from "../../Pages/Header";
import SidePanel from "../../Pages/SidePanel";
import {Constants, users} from "../../../Constants/Constants";

describe('User Management section tests', () => {
  beforeEach(() => {
    loginPage.open();
    loginPage.login(Constants.adminUserName, Constants.adminPassword);
    loginPage.assertSuccessLogin();
    sidePanel.openAdminPage();
    adminPage.navigateToUserManagement();
  });

  const loginPage = new LoginPage();
  const adminPage = new AdminPage();
  const header = new Header();
  const sidePanel = new SidePanel();

  it('Adding a new user in the Admin section', () => {
    adminPage.clickToAddButton();
    adminPage.addUser(Constants.newUsername, Constants.newPassword, Constants.role, Constants.employeeName, Constants.status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(Constants.newUsername);
    adminPage.selectUser(Constants.newUsername);
    adminPage.deleteUser();
    adminPage.verifyDeletedUserNotVisible(Constants.newUsername);
  })

  it('Editing an existing user role', () => {
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

  it('Searching for Users by Role', () => {
    adminPage.searchUserByRole(Constants.filteredRole);
    adminPage.verifySelectedRole(Constants.role);
  });

  it('Resetting User Password', () => {
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

  it('Updating System User status', () => {
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

  it('Validating User Role Permissions', () => {
    adminPage.clickToAddButton();
    adminPage.addUser(Constants.newUsername2, Constants.newPassword, Constants.role, Constants.employeeName, Constants.status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(Constants.newUsername2);
    header.logOut();
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

  it('Add User Mandatory Fields and Validation Messages', () => {
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

  it('Bulk User Creation and Validation', () => {
    users.forEach((user) => {
      adminPage.clickToAddButton();
      adminPage.addUser(user.username, user.password, user.role, user.employeeName, user.status);
      adminPage.clickToSaveBtn();
      adminPage.assertSuccessMessage();
    });
    cy.wait(2500);
    users.forEach((user) => {
      adminPage.verifyThatUserAdded(user.username);
      adminPage.verifyRoleUpdated(user.username, user.role);
      adminPage.verifyEmployeeNameAdded(user.username, user.employeeName);
      adminPage.verifyThatStatusUpdated(user.username, user.status);
      adminPage.selectUser(user.username);
      adminPage.deleteUser();
      adminPage.verifyDeletedUserNotVisible(user.username);
    });
  });

  it('Adding and Verifying a Duplicate User', () => {
    adminPage.clickToAddButton();
    adminPage.addUser(Constants.newUsername, Constants.newPassword, Constants.role, Constants.employeeName, Constants.status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(Constants.newUsername);
    adminPage.clickToAddButton();
    adminPage.addUser(Constants.newUsername, Constants.newPassword, Constants.role, Constants.employeeName, Constants.status);
    adminPage.clickToSaveBtn();
    adminPage.verifyErrorMessageVisible(Constants.usernamefield);
    adminPage.navigateToUserManagement();
    adminPage.selectUser(Constants.newUsername);
    adminPage.deleteUser();
    adminPage.verifyDeletedUserNotVisible(Constants.newUsername);
  });
})
