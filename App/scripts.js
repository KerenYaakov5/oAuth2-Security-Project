$(document).ready(() => {
    sendForm();
});

function sendForm() {
    $("#oAuthForm button").click((event) => {
        event.preventDefault();

        const clientCredentials = $("#clientAuthentication").val();

        if (!clientCredentials) {
            console.log("Error: client credentials value is empty");
        } else {
            console.log("oAuthForm: " + clientCredentials);
            // Send to server
        }
    });
}
