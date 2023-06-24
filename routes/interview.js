const passport = require("passport");
const router = require("express").Router();
const { interviewController } = require("../controllers");

//renders interview dashboard
router.get(
  "/dashboard",
  passport.checkAuthentication,
  interviewController.viewDashboard
);

//route to see list of students applied for a prticular company
router.get("/company/:companyName", interviewController.companyDashboard);
//route to see external jobs list
router.get("/external-jobs", interviewController.externalJobs);
//route to add intrview for a student
router.post("/add", interviewController.addInterview);
//route to update application status
router.post("/updateStatus", interviewController.updateStatus);

module.exports = router;
