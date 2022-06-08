const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
       /* default: 42,
        min: 42,
        max: 4242*/
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    target: {
        /*type: mongoose.ObjectId,
        ref: 'Planet',*/
        type: String, //since we only need Planet Name here, no need to associate Planet ObjectId
        required: true
    },
    customers:  [ String ],
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    }
});