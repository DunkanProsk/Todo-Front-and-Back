const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
    login: '',
    password: ''
}, {versionKey: false});

module.exports = mongoose.model("Users", userScheme);