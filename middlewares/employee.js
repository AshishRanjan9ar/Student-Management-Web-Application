const { Employee } = require("../models");

module.exports.employeeRegisterPrechecks = async function (req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  //check if all fields are filled
  if (!(name && email && password && confirmPassword)) {
    req.flash("error", "Please fill all the details");
  }
  //check if password and confirmpassword are same
  if (password !== confirmPassword) {
    req.flash("error", "passwords do not match");
    return res.redirect("/signup");
  }
  //check if user already registered and return to signin page else call next
  try {
    const empDetails = await Employee.findOne({ email: email });
    if (empDetails) {
      req.flash("error", "user is already registered , please login");
      return res.redirect("/signup");
    }
  } catch (err) {
    console.error("error while finding employee");
  }
  next();
};
