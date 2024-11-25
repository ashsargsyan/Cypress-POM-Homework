const Constants = {
    url: 'https://opensource-demo.orangehrmlive.com/',
    adminUserName: 'Admin',
    adminPassword: 'admin123',
    newUsername: 'testuser8',
    newUsername2: 'testuser5',
    newPassword: 'Testuser005',
    resetNewPassword: 'Testuser88',
    role: 'ESS',
    filteredRole: 'Admin',
    employeeName: 'Orange',
    status: 'Enabled',
    updatedStatus: 'Disabled',

    //Add a user fields name
    userrole: 'User Role',
    employeename: 'Employee Name',
    statusfield: 'Status',
    usernamefield: 'Username',
    passwordfield: 'Password',
    confirmPasswordfield: 'Confirm Password',
}

const users = [
    {
        username: 'testuser7',
        password: 'Testuser01',
        role: 'ESS',
        employeeName: 'Orange',
        status: 'Enabled',
    },
    {
        username: 'testuser4',
        password: 'Testuser02',
        role: 'ESS',
        employeeName: 'Orange',
        status: 'Enabled',
    },
    {
        username: 'testuser9',
        password: 'Testuser03',
        role: 'Admin',
        employeeName: 'Orange Test',
        status: 'Enabled',
    }
]

export {Constants, users};
