const passport = require("passport");


const LocalStrategy = require("passport-local").Strategy;
const { Employee } = require("../models");
//authentication using passport
passport.use(
  //*this is our strategy we check user is present in db or not
  new LocalStrategy(
    {
      //this is syntax whichask for unique field here email is unique
      usernameField: "email",
      //setting this true passes req object to callback
      passReqToCallback: true,
    },
    //whenever localstrategy is called email and password will be passed on
    async function (req, email, password, done) {
      //find a user and establish identity
      try {
        const user = await Employee.findOne({ email: email });

        if (!user || user.password != password) {
          req.flash("error", "Invalid email /Password");
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        req.flash("error", "Error ! user not found");
        return done(err);
      }
    }
  )
);

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});
//deserializing the user from the key cookie
passport.deserializeUser(async function (id, done) {
  try {
    const user = await Employee.findById(id);

    if (!user) {
      console.log("error in deserializing");
      return done(err);
    }
    return done(null, user);
  } catch (err) {
    // req.flash("error", "Error ! user not found");
    console.log("Error! user not found");
    return done(err);
  }
});

//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if user is signed in ,then pass on requeststo next fnction ie. controller
  if (req.isAuthenticated()) {
    return next();
  }
  //ifuser is not signed in
  req.flash("error", "you need to be logged in");
  return res.redirect("/signup");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains current signed in user  from session cookie and we just set it to locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;








// const passport = require('passport');
// const passportLocals = require('passport-local').Strategy;
// const Employee = require('../models/employee');
// let passportcallback = async function (req, email, password, done) {
//     try {
//         const employeePresent = await Employee.findOne({ email: email });

//         if (!employeePresent || employeePresent.password != password ) {
//             req.flash('error', 'Please Enter Valid Email & Password !');
//             return done(null, false);
//         }
            
//             return done(null, employeePresent);
        

//     } catch (error) {
//         return done(error);
//     }
// }
// passport.use(new passportLocals({ usernameField: 'email', passReqToCallback: true }, passportcallback));
// passport.serializeUser(function (employee, done) {
//     return done(null, employee.email);
// });

// const deserializeUserCallback = async function (email, done) {
//     try {
//         const employeeLogin = await Employee.findOne({ email: email });
//         return done(null, employeeLogin);
//     } catch (error) {
//         return done(error);
//     }
// }
// passport.deserializeUser(deserializeUserCallback);
// //now check user is authenticated or not
// passport.checkAuthentication = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         // req.user contains user details
//         return next();
//     }
//     return res.redirect('/');
// }

// module.exports = passport;