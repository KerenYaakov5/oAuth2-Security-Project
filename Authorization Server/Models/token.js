const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
    userId: { type: String },
    clientId: { type: String },
    clientSecret: { type: String },
    accessToken: { type: String },
    validUntil: { type: Date },
    updateTime: { type: Date }
}, { collection: 'tokens' });

const Token = model('Token', tokenSchema); 

module.exports = Token;
