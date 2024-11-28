import LoginPage from "../../Pages/LoginPage";
import AdminPage from "../../Pages/AdminPage";
import Header from "../../Pages/Header";
import SidePanel from "../../Pages/SidePanel";

describe('User Management section tests', () => {
  const loginPage = new LoginPage();
  const adminPage = new AdminPage();
  const header = new Header();
  const sidePanel = new SidePanel();

  let adminData, usersData, userInfo

  before(() => {
    cy.fixture('/Users/admin.json').then((admin) => {
      adminData = admin;
    });
    cy.fixture('Users/users.json').then((users) => {
      usersData = users;
    });
    cy.fixture('Admin page/User Management/usersInfo.json').then((usersInfo) => {
      userInfo = usersInfo;
    });
  })

  beforeEach(() => {
    cy.openSite();
    loginPage.login(adminData.username, adminData.password);
    loginPage.assertSuccessLogin();
    sidePanel.openAdminPage();
    adminPage.navigateToUserManagement();
  });

  it('Adding a new user in the Admin section', () => {
    adminPage.clickToAddButton();
    adminPage.addUser(usersData[0].username, usersData[0].password, usersData[0].role, usersData[0].employeeName, usersData[0].status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(usersData[0].username);
    adminPage.combinedDeleting(usersData[0].username);
  })

  it('Editing an existing user role', () => {
    adminPage.clickToAddButton();
    adminPage.addUser(usersData[0].username, usersData[0].password, usersData[0].role, usersData[0].employeeName, usersData[0].status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(usersData[0].username);
    adminPage.searchUserByUsername(usersData[0].username);
    adminPage.clickToEditBtn();
    adminPage.editExistingUserRole(userInfo.filteredRole);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyRoleUpdated(usersData[0].username, userInfo.filteredRole);
    adminPage.combinedDeleting(usersData[0].username);
  });

  it('Searching for Users by Role', () => {
    adminPage.searchUserByRole(userInfo.filteredRole);
    adminPage.verifySelectedRole(userInfo.role);
  });

  it('Resetting User Password', () => {
    adminPage.clickToAddButton();
    adminPage.addUser(usersData[0].username, usersData[0].password, usersData[0].role, usersData[0].employeeName, usersData[0].status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(usersData[0].username);
    adminPage.searchUserByUsername(usersData[0].username);
    adminPage.clickToEditBtn();
    adminPage.resetPassword(usersData[0].newPassword);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.combinedDeleting(usersData[0].username);
  });

  it('Updating System User status', () => {
    adminPage.clickToAddButton();
    adminPage.addUser(usersData[0].username, usersData[0].password, usersData[0].role, usersData[0].employeeName, usersData[0].status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(usersData[0].username);
    adminPage.searchUserByUsername(usersData[0].username);
    adminPage.clickToEditBtn();
    adminPage.editUserStatus(userInfo.updatedStatus);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatStatusUpdated(usersData[0].username, userInfo.updatedStatus);
    adminPage.combinedDeleting(usersData[0].username);
  });

  it('Validating User Role Permissions', () => {
    adminPage.clickToAddButton();
    adminPage.addUser(usersData[1].username, usersData[1].password, usersData[1].role, usersData[1].employeeName, usersData[1].status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(usersData[1].username);
    header.logOut();
    loginPage.login(usersData[1].username, usersData[1].password);
    loginPage.assertSuccessLogin();
    sidePanel.searchInSidePanel(userInfo.filteredRole);
    sidePanel.verifyAdminNotVisible();
    adminPage.verifyThatUserManagementNotAvailable();
    header.logOut();
    loginPage.login(adminData.username, adminData.password);
    loginPage.assertSuccessLogin();
    sidePanel.openAdminPage();
    adminPage.navigateToUserManagement();
    adminPage.searchUserByUsername(usersData[1].username);
    adminPage.combinedDeleting(usersData[1].username);
  });

  it('Add User Mandatory Fields and Validation Messages', () => {
    adminPage.clickToAddButton();
    adminPage.clickToSaveBtn();
    adminPage.verifyErrorMessageVisible(userInfo.userrole);
    adminPage.verifyErrorMessageVisible(userInfo.employeename);
    adminPage.verifyErrorMessageVisible(userInfo.statusfield);
    adminPage.verifyErrorMessageVisible(userInfo.usernamefield);
    adminPage.verifyErrorMessageVisible(userInfo.passwordfield);
    adminPage.verifyErrorMessageVisible(userInfo.confirmPasswordfield);
    adminPage.addUser(usersData[0].username, usersData[0].password, usersData[0].role, usersData[0].employeeName, usersData[0].status);
    adminPage.verifyErrorMessageNotVisible(userInfo.userrole);
    adminPage.verifyErrorMessageNotVisible(userInfo.employeename);
    adminPage.verifyErrorMessageNotVisible(userInfo.statusfield);
    adminPage.verifyErrorMessageNotVisible(userInfo.usernamefield);
    adminPage.verifyErrorMessageNotVisible(userInfo.passwordfield);
    adminPage.verifyErrorMessageNotVisible(userInfo.confirmPasswordfield);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(usersData[0].username);
    adminPage.combinedDeleting(usersData[0].username);
  });

  it('Bulk User Creation and Validation', () => {
    usersData.forEach((user) => {
      adminPage.clickToAddButton();
      adminPage.addUser(user.username, user.password, user.role, user.employeeName, user.status);
      adminPage.clickToSaveBtn();
      adminPage.assertSuccessMessage();
      adminPage.verifyThatUserAdded(user.username);
      adminPage.verifyRoleUpdated(user.username, user.role);
      adminPage.verifyEmployeeNameAdded(user.username, user.employeeName);
      adminPage.verifyThatStatusUpdated(user.username, user.status);
      adminPage.combinedDeleting(user.username);
    });
  })

  it('Adding and Verifying a Duplicate User', () => {
    adminPage.clickToAddButton();
    adminPage.addUser(usersData[1].username, usersData[1].password, usersData[1].role, usersData[1].employeeName, usersData[1].status);
    adminPage.clickToSaveBtn();
    adminPage.assertSuccessMessage();
    adminPage.verifyThatUserAdded(usersData[1].username);
    adminPage.clickToAddButton();
    adminPage.addUser(usersData[1].username, usersData[1].password, usersData[1].role, usersData[1].employeeName, usersData[1].status);
    adminPage.clickToSaveBtn();
    adminPage.verifyErrorMessageVisible(userInfo.usernamefield);
    adminPage.navigateToUserManagement();
    adminPage.combinedDeleting(usersData[1].username);
  });

  afterEach(() => {
    header.logOut();
  })
})
