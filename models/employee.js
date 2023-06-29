const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    employee_email: { type: String, required: true },
    employee_password:{type:String,require:true},
    employee_name: { type: String, required: true }
},{timestamps:true});
const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;