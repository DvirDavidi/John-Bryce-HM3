function adminOperation() {
    console.log("admin wuz here");
    return true;
}

function OperationNotAllowedError(username, errorCode, role) {
    this.username = username;
    this.errorCode = parseInt(errorCode);
    this.role = role;
}

// implement OperationNotAllowedError with the following fields: username, errorCode, role

const BASIC = "basic";
const SUB_ADMIN = "sub_admin";
const ADMIN = "admin";

function User(username, role) {
    this.username = username;
    this.role = role;
}

const ERROR_STATUS_CODE_USER_NOT_ALLOWED = 1000;
const ERROR_STATUS_CODE_USER_DOES_NOT_EXIST = 200;

function checkIfUserExist(user) {
    return (user.role === BASIC || user.role === SUB_ADMIN || user.role === ADMIN);
}

// implement the following function
// check wether or not the user is allowed to perform the op
// if not, throw an appropriate exception/error (specific type)
// if allowed, invoke adminOperation and return indication on the success of the operation
// print the result
// always print that an operation was attempted and wether is was successful or not.
function doAdminOperation(user) {
    let ifSuccess;

    try {
        if (checkIfUserExist(user)) {

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
                default:
                    ifSuccess = adminOperation();
                    break;
            }
        } else {
            throw new OperationNotAllowedError(
                user.username,
                ERROR_STATUS_CODE_USER_DOES_NOT_EXIST,
                user.role
            );
        }

    } catch (myException) {
        switch (myException.errorCode) {
            case ERROR_STATUS_CODE_USER_NOT_ALLOWED:
                console.log(myException, "User is not allowed");
                break;
            case ERROR_STATUS_CODE_USER_DOES_NOT_EXIST:
                console.log(myException, "User is not exists");
                break;
            default:
                console.log(myException, "Invalid fields");
                break;
        }
    } finally {
        (ifSuccess) ? console.log("Done") : console.log("Try with Admin user");
    }
}

const user1 = new User("Dvir", "@");
doAdminOperation(user1);