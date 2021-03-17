const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    last_name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 255,
        min: 6
    },
    // phone:{
    //     type: String,
    //     required: true,
    //     min: 4,
    //     max: 255
    // },
    phoneNumberSelected1:{
        type: String,
        required: true,
        max: 255
    },
    phone_digits:{
        type: String,
        required: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);