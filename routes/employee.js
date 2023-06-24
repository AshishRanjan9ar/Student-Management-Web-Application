const passport = require("passport");
const router = require("express").Router();
const { employeeController } = require("../controllers");

const { employeeRegisterPrechecks } = require("../middlewares");

//renders dashboard
router.get(
  "/dashboard",
  passport.checkAuthentication,
  employeeController.viewDashboard
);
//route to download report in csv
router.get(
  "/downloadCSV",
  passport.checkAuthentication,
  employeeController.downloadCSV
);

//for registering employee , does prechecks in custom middle ware
router.post(
  "/register",
  employeeRegisterPrechecks,
  employeeController.register
);

//NOTE:we have used passport local strategy so it authenticates checking in strategy which we configured that if user is present in db
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/signup" }),
  employeeController.login
);

module.exports = router;
