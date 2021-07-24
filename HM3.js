const BASIC = "basic";
const SUB_ADMIN = "sub_admin";
const ADMIN = "admin";
const ERROR_STATUS_CODE_USER_NOT_ALLOWED = 1000;
const ERROR_STATUS_CODE_USER_DOES_NOT_EXIST = 200;

// New instances for a few OperationNotAllowedError.
const user1 = new User('Dvir', ADMIN);
doAdminOperation(user1);
console.log('\n');

const user2 = new User('Asia', SUB_ADMIN);
doAdminOperation(user2);
console.log('\n');

const user3 = new User('Ben', BASIC);
doAdminOperation(user3);
console.log('\n');

const user4 = new User('Zion', "1213");
doAdminOperation(user4);
console.log('\n');


// Return indication on the success of the operation.
function adminOperation() {
    console.log("admin wuz here.");
    return true;
}

// A constructor for defining new OperationNotAllowedError.
function OperationNotAllowedError(username, errorCode, role) {
    this.username = username;
    this.errorCode = parseInt(errorCode);
    this.role = role;
}

// A constructor for defining new User.
function User(username, role) {
    this.username = username;
    this.role = role;
}

// Checking wether or not the user is allowed to perform the op
// and print the result.
function doAdminOperation(user) {
    try {
        switch (user.role) {
            case BASIC:
                throw new OperationNotAllowedError(
                    user.username,
                    ERROR_STATUS_CODE_USER_NOT_ALLOWED,
                    BASIC
                );

            case SUB_ADMIN:
                throw new OperationNotAllowedError(
                    user.username,
                    ERROR_STATUS_CODE_USER_NOT_ALLOWED,
                    SUB_ADMIN
                );

            case ADMIN:
                let returnValue = adminOperation();
                console.log('Done.');
                return returnValue;

            default:
                throw new OperationNotAllowedError(
                    user.username,
                    ERROR_STATUS_CODE_USER_DOES_NOT_EXIST,
                    user.role
                );
        }
    } catch (myException) {
        switch (myException.errorCode) {
            case ERROR_STATUS_CODE_USER_NOT_ALLOWED:
                console.log(myException, 'User is not allowed.');
                break;
            case ERROR_STATUS_CODE_USER_DOES_NOT_EXIST:
                console.log(myException, 'User does not exists.');
                break;
            default:
                console.log(myException, 'Invalid fields.');
                break;
        }
        console.log("The operation failed. please try with admin user.");
    }
}

