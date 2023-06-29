const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    student_name: { type: String, required: true },
    batch: { type: String, required: true },
    college_name: { type: String, required: true },
    course_score: {
        dsa: { type: Number, required: true },
        webdev: { type: Number, required: true },
        react:{type:Number,required:true}
    },
    student_status:{
        type:String,required:true
    }
},{timestamps:true});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;