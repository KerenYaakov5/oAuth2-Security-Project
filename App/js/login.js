$(document).ready(() => {
    addLoginFormEventListener();
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
    // ajax
}

