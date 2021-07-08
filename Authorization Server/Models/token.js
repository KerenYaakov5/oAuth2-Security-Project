const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
    userId: { type: Number },
    clientId: { type: String },
    clientSecret: { type: String }, // Need to be hashed
    authType: { enum: ["Authorization Code", "Client credentials", "Implicit", "Password"] },  
    accessToken: { type: String }, // Need to be hashed 
    validUntil: { type: Date },
    updateTime: { type: Date }
}, { collection: 'tokens' });

const Token = model('Token', tokenSchema);

module.exports = Token;
