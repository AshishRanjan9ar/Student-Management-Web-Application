var express = require('express');
var router = express.Router();
var Course = require('../models/Course').Course;

/* GET stocks page. */
router.get('/', function(req, res, next) {	

	Course.find().
    exec(function(err, Course) {
              res.render('enroll' , {title: 'Enroll',courseList : Course});
        });

  });  

/* GET order item page */
router.get('/:Id', function(req, res) {

    var Id = req.params.Id;

    Course.findOne({_id:Id}).
    exec(function(err, Course) {
        if (err) {
            // If it failed, return error
            res.send("Error in course founding.");
        }
        else{
              res.render('make_enroll',{title: 'Enroll', enrollingCourse : Course});
            }
        });
    });

/* Order an item */
router.post('/:Id', function(req, res) {
    var Id = req.params.Id;
    var count = req.body.enrollingSeats;

    Course.findOne({_id:Id}).
    exec(function(err, Course) {
        if (err) {
            // If it failed, return error
            res.send("Error occured when finding the course!");
        }
        else{
        	if((Course.seats)>=count)
        	{
        		var rest_seats = Course.seats-count;
                //update item table
        		updateSeatCount(Id,rest_seats);

        		res.redirect('/course_enroll');
   
        	}else{

                if(Course.seats<count){
        		  res.render('error',{ message : 'Cannot Enroll for this much of seats. Because only '+Course.seats+' no of seats are available!'});
                }
        	}
            }
        });
    });

//function for updating item table after ordering an item
function updateSeatCount(_id,count){

	Course.findOne({_id:_id}).
    exec(function(err,Course) {

        	Course.seats = count;

        	Course.save(function (err, updatedSeatsno) {
            if (err) {
            }    
        });
    });
}
module.exports = router;