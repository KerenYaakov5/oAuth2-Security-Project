$(document).ready(() => {
    sendForm();
});

function sendForm() {
    $("#oAuthForm button").click((event) => {
        event.preventDefault();

        console.log("oAuthForm");
        // Send to server
    });
}
