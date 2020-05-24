var express = require('express');
var router = express.Router();
const Show = require("../model/show")
const Theatre = require('../model/theatere')
const Movie = require('../model/movie')


router.post('/create', async function (req, res) {
    try {
        const id = req.body.theatre_id;
        var movieData = {};
        var theatreData = {}


        await Movie.find({ _id: req.body.movie_id }, function (err, data) {

            if (err) {
                return res.status(400).json({
                    "status": "failure",
                    "reason": err
                })
            }

            movieData = data;

        });

        await Theatre.find({ _id: id }, function (err, data) {

            if (err) {
                return res.status(400).json({
                    "status": "failure",
                    "reason": err
                })
            }

            theatreData = data;
            for (var i = 0; i < theatreData[0].shows.length; i++) {
                if (theatreData[0].shows[i].date === req.body.date) {
                    return res.status(400).json({
                        "status": "failure",
                        "reason": "shows can not be overlapped"
                    })
                }
            }
        });

        const show = new Show({
            theatre_id: req.body.theatre_id,
            movie_id: req.body.movie_id,
            date: req.body.date,
            time: req.body.time,
        })
        show
            .save()
            .then(result => {
                return Theatre.findOneAndUpdate({ _id: id },
                    { $push: { "shows": { date: req.body.date, time: req.body.time } } },
                    { multi: true, new: true });
            })
            .then(function (dbProduct) {

                return res.json({
                    "movie": {
                        "movie_id": movieData[0]._id,
                        "movie_name": movieData[0].movie_name,
                        "movie_trailer": movieData[0].movie_trailer,
                        "movie_overview": movieData[0].movie_overview,
                        "movie_poster": movieData[0].movie_poster,
                        "length": movieData[0].length,
                    },
                    "theatre": {
                        "theatre_id": theatreData[0]._id,
                        "theatre_name": theatreData[0].theatre_name,
                        "theatre_location": theatreData[0].theatre_location,
                        "city": theatreData[0].city,
                        "pincode": theatreData[0].pincode,
                    },
                    "shows": [
                        {
                            "date": req.body.date,
                            "time": req.body.time
                        }
                    ]

                });
            })
            .catch(function (err) {

                return res.status(400).json({
                    "status": "failure",
                    "reason": err
                })
            });
    }
    catch{
        return res.status(400).json({
            "status": "failure",
            "reason": "failed to create"
        })
    }
})









module.exports = router;
