function addSubmitFormEventListener() {
    $("#oAuthForm button").click((event) => {
        event.preventDefault();

        const clientCredentials = $("#clientAuthentication").val();
        if (!clientCredentials) {
            console.log("Error: client credentials value is empty");
        } else {
            sendAccessTokenRequest(clientCredentials);
        }
    });
}

function sendAccessTokenRequest(clientCredentials) {
    const token = getTokenFromCookie();
    const userId = getUserIdFromCookie();

    if (!token || !userId) {
        window.location.href = "../settings/login.html";
    }

    const accessTokenRequestData = {
        clientCredentials: clientCredentials,
        grantType: "client_credentials",
        userId: userId
    }

    $.ajax({
        url: "http://localhost:3000/api/oauth2/token",
        method: "POST",
        data: accessTokenRequestData,
        headers: {'x-access-token' : token},
        success: (response) => {
            $("#main-content").empty();
            $("#main-content").append(`<p><b>Response</b> (use the access token to make API calls)</p>`);
            $("#main-content").append(`<p>Access token: ${response.access_token}</p>`);
            $("#main-content").append(`<p>Expired in: ${response.expires_in} seconds</p>`);
        },
        error: (error) => {
            if (error.status == 401 || error.status == 500) {
                clearCookie();

                window.location.href = "../settings/login.html";
            } else {
                console.log(`Error on generating access token: ${error}`);
            }
        }
    });
}

function getTokenFromCookie() {
    const cookie = document.cookie;

    if (!cookie) {
        return null;
    }

    const cookieKeyValue = cookie.split(/[;= ]+/);
    const userTokenKeyIndex = cookieKeyValue.indexOf('userToken');

    return cookieKeyValue[userTokenKeyIndex + 1];
}

function getUserIdFromCookie() {
    const cookie = document.cookie;

    if (!cookie) {
        return null;
    }

    const cookieKeyValue = cookie.split(/[;= ]+/);
    const userIdKeyIndex = cookieKeyValue.indexOf('userId');

    return cookieKeyValue[userIdKeyIndex + 1];
}

function clearCookie() {
    const cookie = document.cookie;
    const cookieKeyValue = cookie.split(/[;= ]+/);

    const userTokenIndex = cookieKeyValue.indexOf('userToken') + 1;
    const userIdIndex = cookieKeyValue.indexOf('userId') + 1;
    const userNameIndex = cookieKeyValue.indexOf('userName') + 1;

    const now = new Date();

    document.cookie = `userId=${cookieKeyValue[userIdIndex]}; expires=${now}; Path=/`;
    document.cookie = `userName=${cookieKeyValue[userNameIndex]}; expires=${now}; Path=/`;
    document.cookie = `userToken=${cookieKeyValue[userTokenIndex]}; expires=${now}; Path=/`;
}
