const Interview = require('../models/Interview');
//function to add interview list
module.exports.addInterview = (req, res) => {
    if (req.body.stId && req.body.cname && req.body.date) {
        Interview.create({
            company_name: req.body.cname,
            date: req.body.date,
            student_id: req.body.stId
        }).then((data) => {
            return res.redirect('/students');
        }).catch((err) => {
            console.log(err);
        })
    } else {
        return res.redirect('back');
    }

}
//function to update status
module.exports.updateStatus = (req, res) => {
    Interview.findOneAndUpdate({
            _id: req.params.id
        }, {
            result: req.params.val
        })
        .then((data) => {
            res.redirect('/allocate');
        }).catch((err) => {
            console.log(err);
        })
}
//function to allocate interview for student
module.exports.allocateStud = (req, res) => {
    res.locals.student_id = req.params.id;
    Interview.find({}).populate('student_id')
        .then((data) => {
            return res.render('allocate', {
                interviews: data,
                student_id: req.params.id
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
//function to render allocation page with list of interview
module.exports.allocate = (req, res) => {
    Interview.find({}).populate('student_id')
        .then((data) => {
            return res.render('allocate', {
                interviews: data
            });
        })
        .catch((err) => {
            console.log(err);
        });
}
//function to delete data from interview list
module.exports.delete = (req, res) => {
    Interview.findByIdAndDelete(req.params.id).then(() => {
        console.log('deleted');
        res.redirect('/allocate');
    }).catch((err) => {
        console.log(err);
    });
}