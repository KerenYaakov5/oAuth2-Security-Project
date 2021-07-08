$(document).ready(() => {
    const isConnected = isUserConnected();

    if (!isConnected) {
        window.location.href = "../settings/login.html";
    }
});

function isUserConnected() {
    const cookie = document.cookie;

    return !!cookie;
}
