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
        grantType: "client-credentials"
    }

    $.ajax({
        url: "http://localhost:3000/api/oauth2/token",
        method: "POST",
        data: accessTokenRequestData,
        cache: false,
        success: (response) => {
            console.log("success: " + response);
            // add access token to html temp with all fields, like valid until 
        },
        error: (error) => {
            console.log(`Error on generating access token: ${error}`);
        }
    });
}
