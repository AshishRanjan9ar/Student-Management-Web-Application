const { Student } = require("../models");

module.exports.studentRegisterPrechecks = async function (req, res, next) {
  const { name, email, phone, college, placement, batch, dsa, webd, react } =
    req.body;

  //check if all fields are filled
  if (
    !(
      name &&
      email &&
      phone &&
      college &&
      placement &&
      batch &&
      dsa &&
      webd &&
      react
    )
  ) {
    req.flash("error", "Please fill all the details");
  }

  //check if user already registered and return to signin page else call next
  try {
    const studentDetails = await Student.findOne({ email: email });
    if (studentDetails) {
      req.flash("error", "student is already registered ");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error("error while finding student", err);
  }
  next();
};
