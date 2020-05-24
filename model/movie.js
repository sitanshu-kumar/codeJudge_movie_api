const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-url');
const Schema = mongoose.Schema;
const MovieSchema = new mongoose.Schema(
    {
        movie_name: {
            type: String,
            unique: true,
            required: true,

        },
        movie_trailer: {
            type: String,
            required: 'URL can\'t be empty',
            unique: true
        },
        movie_overview: {
            type: String,
            required: true,
            unique: true
        },
        movie_poster: {
            type: String,
            required: 'URL can\'t be empty',
            unique: true
        },
        length: {
            type: Number,
            required: true
        },

    },

    {
        collection: "movie",
    }
);
MovieSchema.plugin(uniqueValidator);
MovieSchema.path('movie_trailer').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

MovieSchema.path('movie_poster').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
