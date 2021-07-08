const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    userLevel: { type: String, enum: ["Admin", "Manager", "End User"] }
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
