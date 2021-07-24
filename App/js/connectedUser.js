function isUserConnected() {
    const cookie = document.cookie;
    const isConnected = !!cookie;

    if (!isConnected) {
        window.location.href = "../settings/login.html"; // TODO - with a link, not automatically
    } else {
        return true;
    }
}
