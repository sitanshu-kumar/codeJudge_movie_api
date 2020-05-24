var express = require('express');
var router = express.Router();
const Movie = require("../model/movie")


router.post('/create', function (req, res, next) {
    var finalStatus = false;
    try {
        Movie.create(
            {
                movie_name: req.body.movie_name,
                movie_trailer: req.body.movie_trailer,
                movie_overview: req.body.movie_overview,
                movie_poster: req.body.movie_poster,
                length: req.body.length,

            },
            function (error, response) {
                if (error) {
                    finalStatus = false;

                    return res.status(400).json({
                        "status": "failure",
                        "reason": error
                    })
                }
                finalStatus = true;
                if (finalStatus === true) {
                    return res.status(200).json({
                        "movie_id": response._id,
                        "movie_name": response.movie_name,
                        "movie_trailer": response.movie_trailer,
                        "movie_overview": response.movie_overview,
                        "movie_poster": response.movie_poster,
                        "length": response.length,
                    });
                }
                else {
                    return res.json({
                        "status": "failure",
                        "reason": "failed to create"
                    })
                }
            }
        )
    }
    catch{
        return res.status(400).json({
            "status": "failure",
            "reason": "failed to create"
        })
    }
});



module.exports = router;
