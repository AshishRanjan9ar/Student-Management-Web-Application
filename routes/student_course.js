var express = require('express');
var router = express.Router();
var Course = require('../models/Course').Course;

/* GET courses page. */
router.get('/', function(req, res, next) {
	Course.find({},{}, function(err, docs){
            if(err) res.send(err);
            res.render('Course', { Course : docs });
  
    });
});

//Delete a Course when course id has been given
router.get('/:id',function (req,res){
  Course.findOneAndRemove({_id : req.params.id}, function (err,result){
    res.redirect('/student_course')
  });
});

//Get course update page when course id has been given
router.get('/update/:id', function(req, res) {

    var id = req.params.id;
    Course.findOne({_id:id}). 
    exec(function(err, Course) {

        if (err) {

            // If course cannot be found, then display the error message
            res.send("Error occured when course was founding!");
        }
        else{
              res.render('update',{title: 'Update', updatingCourse : Course});
            }
        });
    });

//Update a course when course id has been given
router.post('/update/:id', function(req, res) {
    var id = req.params.id;
    var duration = req.body.duration; 
    var start = req.body.start;
    var Lecturer = req.body.Lecturer;
    var seats = req.body.seats;

    Course.findOne({_id:id}).
    exec(function(err, Course) {
        console.log(Course);
        if (err) {
            // If it failed, return error
            res.send("Error in item founding.");
        }
        else{
            console.log(Course);
            Course.duration = duration; 
            Course.start= start;
            Course.Lecturer =Lecturer ;
            Course.seats= seats;
            console.log(Course);
            Course.save(function (err, updatedcourse) {
                if (err) {
                    throw err;
                }
                res.redirect('/student_course');

        });
            
        }
            
    });
});

module.exports = router;