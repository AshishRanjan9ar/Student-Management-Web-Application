const Student = require('../models/student');
const Interview = require('../models/Interview');
//function to add student to database
module.exports.addStudent = (req, res) => {
    Student.create({
        student_name: req.body.sname,
        batch: req.body.batch,
        college_name: req.body.cname,
        course_score: {
            dsa: req.body.dsa,
            webdev: req.body.webdev,
            react: req.body.react
        },
        student_status: req.body.status
    }).then((data) => {
        res.redirect('/students');
    }).catch((err) => {
        console.log(err);
    });
}
//function to render student list on student page
module.exports.students = (req, res) => {
    Student.find({}).then((data) => {
        return res.render('students', { results: data });
    }).catch((err) => {
        console.log(err);
    });
    
}
//function to delete data from student list
module.exports.delete = (req, res) => {
    let id = req.params.id;
    Interview.findOneAndDelete({ student_id: id }).then(() => {
    }).catch((err) => console.log(err));
    Student.findByIdAndDelete(id).then(() => {
    }).catch((err) => console.log(err));
    return res.redirect('/students');

}