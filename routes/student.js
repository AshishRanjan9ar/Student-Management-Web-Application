const passport = require("passport");
const router = require("express").Router();
const { studentController } = require("../controllers");

const { studentRegisterPrechecks } = require("../middlewares");

// router.get(
//   "/dashboard",
//   passport.checkAuthentication,
//   employeeController.viewDashboard
// );

//for adding new student
router.post("/add", studentRegisterPrechecks, studentController.addStudent);
//removing a student
router.post("/remove", studentController.removeStudent);

module.exports = router;
