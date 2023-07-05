var mongoose = require('mongoose');
// Define schema
var Schema = mongoose.Schema;

var Students = new Schema({
	name: String,
    email: String,
    age: String,
    address: String,
    password: String,
    cpassword: String
});

// Compile model from schema
var Students = mongoose.model('Students', Students );
module.exports = {
  Students: Students
}