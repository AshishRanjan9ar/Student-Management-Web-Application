var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var Course = new Schema({
	cname: String,
	duration: String,
	start: String,
	Lecturer: String,
	seats: Number
});

// Compile model from schema
var Course = mongoose.model('Course', Course );
module.exports = {
  Course: Course
}