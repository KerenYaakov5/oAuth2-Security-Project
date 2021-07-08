$(document).ready(() => {
    checkConnectedUser();
});

function checkConnectedUser() {
    const cookie = document.cookie;

    if (cookie) {
        console.log("Cookie is: " + cookie);

        // get the client id and validate 
    } else {
        console.log("No cookie");

        window.location.href = "../settings/login.html";
    }

    // const now = new Date();
    // now.setTime(now.getTime() + (60*60*1000)); // For an hour
    // document.cookie = `userid=2611, username=keren, expires=${now}`;
}
