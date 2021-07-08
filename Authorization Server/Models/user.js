const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: { type: String, unique: true, required : true },
    password: { type: String, required : true },
    firstName: { type: String },
    lastName: { type: String },
    userLevel: { type: String, enum: ["Admin", "Manager", "End User"] }
}, { collection: 'users' });

const User = model('User', userSchema);

module.exports = User;
