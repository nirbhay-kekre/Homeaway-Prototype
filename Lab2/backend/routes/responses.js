const sendSuccess = (resp, data = {}) => {
    let responseData = {
        success: true,
        message: "Successful",
        ...data
    };
    console.log("sending success response with code 200");
    console.log(responseData);
    resp.writeHead(200, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify(responseData));
}

const sendAuthenticationFailure = (resp, data = {}) => {
    console.log("sending Authentication Failure with code 401", data);
    resp.writeHead(401, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "The username or password you entered is incorrect.",
        ...data
    }));
}

const sendAuthorizationFailure = (resp, data = {}) => {
    console.log("sending Authorization Failure with code 403", data);
    resp.writeHead(403, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "User is not authorized to perform this action",
        ...data
    }));
}

const sendInternalServerError = (resp, data = {}) => {
    console.log("sending Internal server error with code 500", data);
    resp.writeHead(500, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "Internal Server Error",
        ...data
    }));
}

const sendBadRequest = (resp, data = {}) => {
    console.log("sending Bad Request with error code 400", data);
    resp.writeHead(400, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "Bad Request",
        ...data
    }));
}

const sendResourceConflictFailure = (resp, data = {}) => {
    console.log("sending Bad Request with error code 400", data)
    resp.writeHead(409, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "Resource Conflict",
        ...data
    }));
}

const responseHandler = (resp, result = {}) => {
    switch (result.code) {
        case 200:
            sendSuccess(resp, result.data);
            break;
        case 400:
            sendBadRequest(resp);
            break;
        case 401:
            sendAuthenticationFailure(resp);
            break;
        case 403:
            sendAuthorizationFailure(resp);
            break;
        case 500:
            sendInternalServerError(resp);
            break;
        case 409:
            sendResourceConflictFailure(resp);
            break;
        default:
            sendInternalServerError(resp,{
                reason: "default"
            });
    }
}

module.exports = { sendSuccess, sendAuthenticationFailure, sendAuthorizationFailure, sendInternalServerError, sendBadRequest, responseHandler };