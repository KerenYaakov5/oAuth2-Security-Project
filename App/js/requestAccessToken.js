$(document).ready(() => {
    addSubmitFormEventListener();
});

function addSubmitFormEventListener() {
    $("#oAuthForm button").click((event) => {
        event.preventDefault();

        const clientCredentials = $("#clientAuthentication").val();
        if (!clientCredentials) {
            console.log("Error: client credentials value is empty");
        } else {
            sendAccessTokenRequest(clientCredentials);
        }
    });
}

function sendAccessTokenRequest(clientCredentials) {
    const accessTokenRequestData = {
        clientCredentials: clientCredentials,
        grantType: "client_credentials"
    }

    $.ajax({
        url: "http://localhost:3000/api/oauth2/token", // TODO - change to real server 
        method: "POST",
        data: accessTokenRequestData,
        cache: false,
        success: (response) => {
            $("#main-content").empty();
            $("#main-content").append(`<p><b>Response</b> (use the access token to make API calls)</p>`);
            $("#main-content").append(`<p>Access token: ${response.access_token}</p>`);
            $("#main-content").append(`<p>Expired in: ${response.expires_in} seconds</p>`);
        },
        error: (error) => {
            console.log(`Error on generating access token: ${error}`);
        }
    });
}
