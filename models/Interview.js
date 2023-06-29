const mongoose = require('mongoose');
const interviewSchema = new mongoose.Schema({
    company_name: { type: String, required: true },
    date: { type: String, require: true },
    student_id: { type:mongoose.SchemaTypes.ObjectId, ref:'Student'},
    result: { type: String,required:true,default:'Hold'}
},{timeseries:true});
const Interview = mongoose.model('Interview', interviewSchema);
module.exports = Interview;