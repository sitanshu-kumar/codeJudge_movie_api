var express = require('express');
var router = express.Router();
const Show = require("../model/show")
const Theatre = require('../model/theatere')
const Movie = require('../model/movie')


router.get('/', async function (req, res) {
    var city = req.query.city.toLowerCase();
    var date = req.query.date;
    var movie_id = req.query.movie_id;
    let theatres = []
    var movieData;

    try {
        await Movie.find({ _id: movie_id }, function (err, data) {

            if (err) {
                return res.status(400).json({
                    "status": "failure",
                    "reason": err
                })
            }

            movieData = data;
            // res.send(data)
        });

        Theatre.find({ "city": city, "shows.date": date }, 'theatre_name theatre_location city pincode shows.date shows.time', function (err, docs) {
            if (err) {
                return res.status(400).json({
                    "status": "failure",
                    "reason": err
                })
            }
            theatres = docs;

            var result = []

            var temp = {
                theatre_id: "",
                theatre_name: "",
                theatre_location: "",
                city: "",
                pincode: "",
                shows: []
            }
            for (var i = 0; i < theatres.length; i++) {
                temp.theatre_id = theatres[i]._id;
                temp.theatre_name = theatres[i].theatre_name;
                temp.theatre_location = theatres[i].theatre_location;
                temp.city = theatres[i].city;
                temp.pincode = theatres[i].pincode;
                temp.shows = theatres[i].shows;
                result.push(temp)
            }


            return res.status(200).json({
                "movie": {
                    "movie_id": movieData[0]._id,
                    "movie_name": movieData[0].movie_name,
                    "movie_trailer": movieData[0].movie_trailer,
                    "movie_overview": movieData[0].movie_overview,
                    "movie_poster": movieData[0].movie_poster,
                    "length": movieData[0].length,
                },
                "theatres": result
            });
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
