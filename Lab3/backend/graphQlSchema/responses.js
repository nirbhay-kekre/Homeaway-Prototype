const sendSuccess = (data = {}) => {
    return {
        statusCode: 200,
        success: true,
        message: "Successful",
        ...data
    };
}

const sendNoContent = (data = {}) => {
    return {
        statusCode: 204,
        success: true,
        message: "No Content",
        ...data

    };
}

const sendAuthenticationFailure = (data = {}) => {
    return {
        statusCode: 401,
        success: false,
        message: "The username or password you entered is incorrect.",
        ...data
    }

}

const sendAuthorizationFailure = (data = {}) => {
    return {
        statusCode: 403,
        success: false,
        message: "User is not authorized to perform this action",
        ...data

    }
}

const sendInternalServerError = (resp, data = {}) => {
    return {
        statusCode: 500,
        success: false,
        message: "Internal Server Error",
        ...data

    }
}

const sendBadRequest = (resp, data = {}) => {
    return {
        statusCode: 400,
        success: false,
        message: "Bad Request",
        ...data

    }
}

const sendResourceConflictFailure = (resp, data = {}) => {
    return {
        statusCode: 409,
        success: false,
        message: "Resource Conflict",
        ...data
    }
}

const responseHandler = (result = {}) => {
    switch (result.code) {
        case 200:
            return sendSuccess(result.data);
            break;
        case 204:
            return sendNoContent(result.data);
            break;
        case 400:
            return sendBadRequest();
            break;
        case 401:
            return sendAuthenticationFailure();
            break;
        case 403:
            return sendAuthorizationFailure();
            break;
        case 500:
            return sendInternalServerError();
            break;
        case 409:
            return sendResourceConflictFailure();
            break;
        default:
            return sendInternalServerError({
                reason: "default"
            });
    }
}

module.exports = { sendSuccess, sendAuthenticationFailure, sendAuthorizationFailure, sendInternalServerError, sendBadRequest, responseHandler };