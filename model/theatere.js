const mongoose = require("mongoose");
require('mongoose-type-url');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const TheatreSchema = new mongoose.Schema(
    {
        theatre_name: {
            type: String,
            unique: true,
            required: true,
        },
        theatre_location: {
            type: String,

        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
        },
        shows: [
            {
                date: String,
                time: String
            }
        ]

    },
    {
        collection: "theatre",
    }
);
TheatreSchema.plugin(uniqueValidator);
TheatreSchema.path('city').validate((val) => {

    var n = ["bengaluru", "mumbai", "delhi", "lucknow"].includes(val);

    return n;
}, 'City not allowed');


const Theatre = mongoose.model("Theatre", TheatreSchema);
module.exports = Theatre;
