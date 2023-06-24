const passport = require("passport");
const { employeeController } = require("../controllers");

const router = require("express").Router();

router.get("/", passport.checkAuthentication, (req, res) => {
  //redirecting to dashboard
  return res.redirect("/employee/dashboard");
});

//renders signin/signup
router.get("/signup", (req, res) => {
  return res.render("sign_in");
});
//deleting session and logout
router.get("/logout", employeeController.logout);
//employee routes
router.use("/employee", require("./employee"));
//student related routes
router.use("/student", require("./student"));
//interview related routes
router.use("/interview", require("./interview"));
module.exports = router;
