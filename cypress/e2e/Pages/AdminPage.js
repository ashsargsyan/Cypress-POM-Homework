import {AdminPageLocators} from "../../Locators/AdminPageLocators";

class AdminPage {

    navigateToUserManagement() {
        cy.get(AdminPageLocators.userManagement).click();
        cy.get(AdminPageLocators.menuItems).click();
    }

    clickToAddButton() {
        cy.get(AdminPageLocators.addUser).click();
    }

    addUser(username, password, role, employeeName, status) {
        cy.get(AdminPageLocators.userRole)
            .parent()
            .siblings('div')
            .find('div[tabindex=0]').click();
        cy.get(AdminPageLocators.menuList)
            .find(AdminPageLocators.userRoleSelect)
            .contains(role).click();
        cy.get(AdminPageLocators.employeeNameInput).type(employeeName);
        cy.wait(1000);
        cy.get(AdminPageLocators.employeeNameSelect)
            .contains(employeeName).click();
        cy.get(AdminPageLocators.status)
            .parent()
            .siblings('div')
            .find('div[tabindex=0]').click();
        cy.get(AdminPageLocators.menuList)
            .find(AdminPageLocators.userRoleSelect)
            .contains(status).click();
        cy.get(AdminPageLocators.userName)
            .parent()
            .siblings('div')
            .find('input')
            .type(username);
        cy.get(AdminPageLocators.password).type(password);
        cy.get(AdminPageLocators.confirmPassword)
            .parent()
            .siblings('div')
            .find('input')
            .type(password);
    }

    clickToSaveBtn() {
        cy.get(AdminPageLocators.saveBtn).click();
    }

    assertSuccessMessage() {
        cy.wait(1000);
        cy.get(AdminPageLocators.successMessage).should('be.visible');
    }

    verifyThatUserAdded(username) {
        cy.get(AdminPageLocators.assertUserAdded)
            .contains(username)
            .should('be.visible');

    }

    searchUserByUsername(username) {
        cy.get(AdminPageLocators.searchUsername)
            .parent()
            .siblings('div')
            .find('input')
            .clear()
            .type(username);
        cy.get(AdminPageLocators.saveBtn).click();
    }

    clickToEditBtn() {
        cy.get(AdminPageLocators.editIcon).click();
    }

    editExistingUserRole(role) {
        cy.get(AdminPageLocators.userRole)
            .parent()
            .siblings('div')
            .find('div[tabindex=0]').click();
        cy.get(AdminPageLocators.menuList)
            .find(AdminPageLocators.userRoleSelect)
            .contains(role).click();
    }

    verifyRoleUpdated(username, role) {
        cy.get(AdminPageLocators.checkUpdatedInfo)
            .contains(username)
            .parent()
            .siblings('div')
            .contains(role)
            .should('be.visible');
    }

    selectUser(username) {
        cy.get(AdminPageLocators.checkUpdatedInfo)
            .contains(username)
            .parent()
            .siblings('div')
            .find(AdminPageLocators.selectCheckBox).click()
    }

    deleteUser() {
        cy.get(AdminPageLocators.deleteBtn).click();
        cy.get(AdminPageLocators.confirmDeleteBtn).click();
        cy.get(AdminPageLocators.successMessage).should('be.visible');
    }

    verifyDeletedUserNotVisible(username) {
        cy.get(AdminPageLocators.usersTableBody)
            .contains(username)
            .should('not.exist');
    }

    searchUserByRole(role) {
        cy.get(AdminPageLocators.searchUserRole)
            .parent()
            .siblings('div')
            .find('div[tabindex=0]').click();
        cy.get(AdminPageLocators.menuList).find(AdminPageLocators.userRoleSelect)
            .contains(role).click();
        cy.get(AdminPageLocators.saveBtn).click();
    }

    verifySelectedRole(filteredRole) {
        cy.get(AdminPageLocators.usersTableBody).should('not.contain', filteredRole);
    }

    resetPassword(newPassword) {
        cy.get(AdminPageLocators.resetPasswordCheckBox).click();
        cy.get(AdminPageLocators.password).type(newPassword);
        cy.get(AdminPageLocators.confirmPassword)
            .parent()
            .siblings('div')
            .find('input')
            .type(newPassword);
    }

    editUserStatus(status) {
        cy.get(AdminPageLocators.status)
            .parent()
            .siblings('div')
            .find('div[tabindex=0]').click();
        cy.get(AdminPageLocators.menuList)
            .find(AdminPageLocators.userRoleSelect)
            .contains(status).click();
    }

    verifyThatStatusUpdated(username, status) {
        cy.get(AdminPageLocators.checkUpdatedInfo)
            .contains(username)
            .parent()
            .siblings('div')
            .contains(status)
            .should('be.visible');
    }

    verifyThatUserManagementNotAvailable() {
        cy.get(AdminPageLocators.userManagement).should('not.exist');
    }

    verifyErrorMessageVisible(fieldname) {
        cy.get(AdminPageLocators.findFieldName)
            .contains(fieldname)
            .parent()
            .siblings(AdminPageLocators.errorMessage)
            .should('be.visible');
    }

    verifyErrorMessageNotVisible() {
        cy.get(AdminPageLocators.userRole)
            .parent()
            .siblings(AdminPageLocators.errorMessage)
            .should('not.exist');
        cy.get(AdminPageLocators.employeeName)
            .parent()
            .siblings(AdminPageLocators.errorMessage)
            .should('not.exist');
        cy.get(AdminPageLocators.status)
            .parent()
            .siblings(AdminPageLocators.errorMessage)
            .should('not.exist');
        cy.get(AdminPageLocators.userName)
            .parent()
            .siblings(AdminPageLocators.errorMessage)
            .should('not.exist');
        cy.get(AdminPageLocators.password)
            .parent()
            .siblings(AdminPageLocators.errorMessage)
            .should('not.exist');
        cy.get(AdminPageLocators.confirmPassword)
            .parent()
            .siblings(AdminPageLocators.errorMessage)
            .should('not.exist');
    }

    verifyEmployeeNameAdded(username, employeeName) {
        cy.get(AdminPageLocators.checkUpdatedInfo)
            .contains(username)
            .parent()
            .siblings('div')
            .contains(employeeName)
            .should('be.visible');
    }
}

export default AdminPage
