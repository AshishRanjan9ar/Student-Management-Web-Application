const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/employee');
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (email, password, done) {
        Employee.findOne({
                employee_email: email
            })
            .then((user) => {
                if (!user || user.employee_password != password) {
                    return done(null, false);
                }
                return done(null, user);
            }).catch((err) => {
                console.log(err);
            });
    }
));

//serializing the employee to set cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
//deserializing the employee

passport.deserializeUser(function (id, done) {
    Employee.findById(id).then((user) => {
        return done(null, user);
    }).catch((err) => {
        return done(err);
    });
});

//middleware to check authentication
passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}