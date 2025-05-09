function addLoginFormEventListener() {
    $("#loginForm button").click((event) => {
        event.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();

        if (!username || !password) {
            console.log("Error: username or password can't be empty");
        } else {
            sendLoginRequest(username, password);
        }
    });
}

function sendLoginRequest(username, password) {
    const loginRequestData = {
        username: username,
        password: password
    }

    $.ajax({
        url: "http://localhost:3000/api/login",
        method: "POST",
        data: loginRequestData,
        success: (response) => {
            if (response && response.auth) {
                saveUserInCookie(response, username);
                window.location.href = "../info/oauth2.html";
            }
        },
        error: (error) => {
            console.log(`Error on login request: ${error}`);
        }
    });
}

function saveUserInCookie(response, userName) {
    const now = new Date();
    now.setTime(now.getTime() + (60*60*1000)); /* Save for an hour */

    document.cookie = `userId=${response.userId}; expires=${now}; Path=/`;
    document.cookie = `userName=${userName}; expires=${now}; Path=/`;
    document.cookie = `userToken=${response.token}; expires=${now}; Path=/`;
}

function isUserConnected() {
    const cookie = document.cookie;
    const cookieKeyValue = cookie.split(/[;= ]+/);
    const userTokenIndex = cookieKeyValue.indexOf('userToken');
    const userToken = cookieKeyValue[userTokenIndex + 1];
    return !!userToken;
}
