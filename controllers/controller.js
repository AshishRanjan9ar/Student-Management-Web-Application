const Employee = require('../models/employee');
//function to render home page
module.exports.home = (req, res) => {
    return res.render('home');
}
//function to render login page
module.exports.login = (req, res) => {
    return res.render('login');
}
//function to render register page
module.exports.register = (req, res) => {
    return res.render('register');
}
//function to render change password page
module.exports.changePass = (req, res) => {
    return res.render('changePassword');
}
//function to add employee to database
module.exports.add = (req, res) => {
    if (req.body.password != req.body.confirmPassword) {
        req.flash('error', 'Password not matched');
        return res.redirect('/register');
    }
    Employee.findOne({
            employee_email: req.body.email
        })
        .then((data) => {
            if (data) {
                req.flash('info', 'Already registered')
                return res.redirect('/login');
            } else {
                Employee.create({
                    employee_email: req.body.email,
                    employee_password: req.body.password,
                    employee_name: req.body.fname,
                }).then((data) => {
                    req.flash('success', 'registered successfully');
                    res.redirect('/login');
                }).catch((err) => {
                    console.log(err);
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });

}
//function to change password
module.exports.change = (req, res) => {
    if (req.body.newPassword != req.body.confirmPassword) {
        req.flash('error', 'password not matched');
        return res.redirect('back');
    }
    Employee.findOne({
            employee_email: req.body.email
        })
        .then((data) => {
            if (data) {
                if (req.body.oldPassword != data.employee_password) {
                    req.flash('error', 'you have entered wrong password')
                    return res.redirect('back');
                }
                Employee.updateOne({
                    $set: {
                        employee_password: req.body.newPassword
                    }
                }).then(() => {
                    req.flash('success', 'password changed successfully');
                    res.redirect('/login');
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                req.flash('error', 'you entered wrong credentials')
                return res.redirect('back');
            }
        })
        .catch();
}
//function to create session
module.exports.createSession = (req, res) => {
    req.flash('success', 'logged-in successfully');
    return res.redirect('/students');
}
//function to signOut
module.exports.signOut = (req, res) => {
    req.session.destroy(function (err) {
        if (err) throw err;
    })
    res.redirect('/login');
}