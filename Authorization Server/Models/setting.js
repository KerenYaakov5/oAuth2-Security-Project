const { Schema, model } = require('mongoose');

const optionSchema = new Schema({
    optionName: { type: Number },
    optionValue: { type: Number }
});

const settingSchema = new Schema({
    settingName: { type: String },
    settingValue: { type: String },
    options: [optionSchema]
}, { collection: 'settings' });

const Setting = model('Setting', settingSchema);

module.exports = Setting;
