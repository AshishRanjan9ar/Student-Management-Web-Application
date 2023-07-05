var express = require('express');
var router = express.Router();
var Course = require('../models/Course').Course;

/* GET add item page. */
router.get('/', function(req, res, next) {
  res.render('add_course', { title: 'Add Item' });
});

/*Add item*/
router.post('/', function(req, res) {
// Get our form values. These rely on the "name" attributes
    var cname = req.body.cname;
    var duration = req.body.duration;
    var start = req.body.start;
	var Lecturer = req.body.Lecturer;
    var seats = req.body.seats;
    console.log(req.body);
// Submit to the DB
Course.create({        
        "cname" : cname,
        "duration" : duration,
        "start" : start,
		"Lecturer" : Lecturer,
        "seats" : seats

    }, function (err, doc) {
        if (err) {
        	console.log('error');
            // If it failed, return error
            res.send("There was a problem in adding items.");
        }
        else {
            // And forward to success page
			console.log('item added successfully');
            res.redirect('/student_course');
        }
    });
});

module.exports = router;