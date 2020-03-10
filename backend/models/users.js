const mongoose = require('mongoose');
const config = require('../config/passport');
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
    email:{type: String},
    password: { type: String },
    active:{type: Boolean,default: false},
    temporarytoken:{type: String},
    admin:{type: Number, default: 0},
    date: { type: Date, default: Date.now }
});

const Users = mongoose.model('users', UsersSchema)

module.exports = Users;