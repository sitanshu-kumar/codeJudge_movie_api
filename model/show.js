const mongoose = require("mongoose");
require('mongoose-type-url');
const Schema = mongoose.Schema;
const ShowSchema = new mongoose.Schema(
    {
        theatre_id: {
            type: String,
        },
        movie_id: {
            type: String,

        },
        date: {
            type: String,
        },
        time: {
            type: String,

        },
    },

    {
        collection: "show",
    }
);

ShowSchema.path('date').validate((val) => {
    dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return dateRegex.test(val);
}, 'Invalid date format.');



ShowSchema.path('time').validate((val) => {
    timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
    return timeRegex.test(val);
}, 'Invalid time format.');




const Show = mongoose.model("Show", ShowSchema);
module.exports = Show;
