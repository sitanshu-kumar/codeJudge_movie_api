var express = require('express');
var router = express.Router();

const Theatre = require('../model/theatere')

router.post('/create', function (req, res, next) {
    var finalStatus = false;

    try {
        Theatre.create(
            {
                theatre_name: req.body.theatre_name,
                theatre_location: req.body.theatre_location,
                city: req.body.city.toLowerCase(),
                pincode: req.body.pincode,

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
                    return res.json({
                        "theatre_id": response._id,
                        "theatre_name": response.theatre_name,
                        "theatre_location": response.theatre_location,
                        "city": response.city,
                        "pincode": response.pincode,
                    });
                }
                else {
                    return res.status(400).json({
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
