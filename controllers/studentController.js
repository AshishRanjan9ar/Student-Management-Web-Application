const { Student } = require("../models");

module.exports.addStudent = async function (req, res) {
  try {
    //Add student in DB
    const newStudent = await Student.create(req.body);
    if (!newStudent) {
      req.flash("error", "cannot register student , please try again");
      return res.redirect("back");
    }

    req.flash("success", "student registered");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error(err);
    return res.end();
  }
};
module.exports.removeStudent = async function (req, res) {
  const { studentID } = req.body;
  try {
    const student = await Student.findByIdAndDelete(studentID);
    if (!student) {
      req.flash("error", "cannot delete , please try again");
      return res.redirect("back");
    }

    req.flash("success", "student removed");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error(err);
    return res.end();
  }
};
