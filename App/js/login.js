$(document).ready(() => {
    const isConnected = isUserConnected();

    if (!isConnected) {
        addLoginFormEventListener();
    } else {
        window.location.href = "../info/oauth2.html";
    }
});

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
        url: "http://localhost:3000/api/login", // TODO - change to real server 
        method: "POST",
        data: loginRequestData,
        cache: false,
        success: (response) => {
            if (response && response.userId) {
                saveUserInCookie(response.userId, username);
                window.location.href = "../info/oauth2.html";
            }
        },
        error: (error) => {
            console.log(`Error on login request: ${error}`);
        }
    });
}

function saveUserInCookie(userId, userName) {
    const now = new Date();
    now.setTime(now.getTime() + (60*60*1000)); /* Save for an hour */

    document.cookie = `userId=${userId}; expires=${now}; Path=/`;
    document.cookie = `userName=${userName}; expires=${now}; Path=/`;
}

function isUserConnected() {
    const cookie = document.cookie;

    return !!cookie;
}
