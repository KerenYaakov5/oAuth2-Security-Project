function addSubmitAccessTokenFormEventListener() {
    $("#resourceForm button").click((event) => {
        event.preventDefault();

        const accessToken = $("#accessToken").val();
        if (!accessToken) {
            console.log("Error: access token value is empty");
        } else {
            sendResourceRequest(accessToken);
        }
    });
}

function sendResourceRequest(accessToken) {
    const token = getTokenFromCookie();
    const userId = getUserIdFromCookie();

    if (!token || !userId) {
        window.location.href = "../settings/login.html";
    }

    const resourceRequestData = {
        userId: userId
    }

    $.ajax({
        url: "http://localhost:3000/api/employees",
        method: "POST",
        data: resourceRequestData,
        headers: {'x-access-token' : token, "Authorization": accessToken},
        success: (response) => {
            console.log("resource response: " + response);

            $("#main-content").empty();
            $("#main-content").append(`<p><b>Resource</b> You got access to resource</p>`);
        },
        error: (error) => {
            if (error.status == 401 || error.status == 500) {
                clearCookie();

                window.location.href = "../settings/login.html";
            } else if (error.status == 404) {
                $("#main-content").empty();
                $("#main-content").append(`<p>Can't get resource. <br> Access token is invalid. Please try again</p>`);
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
