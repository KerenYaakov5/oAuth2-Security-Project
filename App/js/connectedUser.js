$(document).ready(() => {
    const isConnected = isUserConnected();

    if (!isConnected) {
        window.location.href = "../settings/login.html";
    } else {
        window.location.href = "../info/oauth2.html";
    }
});

function isUserConnected() {
    const cookie = document.cookie;

    return !!cookie;
}
