function getUserDetails() {
    const token = getTokenFromCookie();
    const userId = geUserIdFromCookie();

    if (!token || !userId) {
        window.location.href = "../settings/login.html";
    }

    $.ajax({
        url: `http://localhost:3000/api/users/${userId}/details`, // TODO - change to real server 
        method: "GET",
        headers: {'x-access-token' : token},
        success: (response) => {
            $("#client-id").text(response.clientId);
            $("#client-key").text(response.clientSecret);
        },
        error: (error) => {
            if (error.status == 401 || error.status == 500) {
                clearCookie();

                window.location.href = "../settings/login.html";
            } else {
                console.log(`Error getting user details: ${error}`);
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

function geUserIdFromCookie() {
    const cookie = document.cookie;

    if (!cookie) {
        return null;
    }

    const cookieKeyValue = cookie.split(/[;= ]+/);
    const userTokenKeyIndex = cookieKeyValue.indexOf('userId');

    return cookieKeyValue[userTokenKeyIndex + 1];
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
