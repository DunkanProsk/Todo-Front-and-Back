const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({
    name: '',
    checked: false
}, {versionKey: false});

module.exports = mongoose.model("ToDo", userScheme);