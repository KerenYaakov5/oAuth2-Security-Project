exports.helper = {
    decodeClientCredentials(clientCredentials) { // Done
        try {
            let decodedString = "";

            decodedString = Buffer.from(clientCredentials, 'base64').toString();
            if (!decodedString) {
                console.log(`Decoded client credentials string can't be empty`);
                return null;
            }

            const clientKeysArray = decodedString.split(':');
            if (clientKeysArray.length !== 2 || !clientKeysArray[0] || !clientKeysArray[1]) {
                console.log(`Decoded client credentials string is invalid`);
                return null;
            }

            const clientKeys = {
                clientId: clientKeysArray[0],
                clientSecret: clientKeysArray[1]
            }

            return clientKeys;
        } catch(ex) {
            console.log(`Error decoding the client credentials: ${ex}`);
            return null;
        }
    },
    generateToken(bytesSize = 32) { // Done
        const crypto = require("crypto");

        return crypto.randomBytes(bytesSize).toString('hex');
    }
}
