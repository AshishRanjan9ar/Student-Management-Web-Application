const { Student, Interview } = require("../models");
const axios = require("axios");

//render interview dashboard
module.exports.viewDashboard = async function (req, res) {
  try {
    // populate all students
    const students = await Student.find({}).sort({ createdAt: -1 });
    //get all interviews
    const interviews = await Interview.find({})
      .populate("student")
      .sort({ createdAt: -1 });
    //check if both details are present
    if (!(students && interviews))
      req.flash("error", "error while getting details");

    return res.render("interviewDashboard", {
      tableHeader: "Interview Details",
      students,
      interviews,
    });
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error(err);
    return res.end();
  }
};

//add interview
module.exports.addInterview = async function (req, res) {
  //check if all details present
  const { company, student, date } = req.body;
  if (!(company && student && date)) {
    req.flash("error", "please fill all details");
    return res.redirect("back");
  }
  try {
    //check if interview is already scheduled for student
    const studentDetails = await Student.findById(student).populate(
      "interviews"
    );
    const isalreadyScheduled = studentDetails.interviews.find((int) => {
      return int.company === company && int.date === date;
    });
    //if already interview schudeuled return back
    if (isalreadyScheduled) {
      req.flash(
        "error",
        `${studentDetails.name} already has scheduled interview for ${company} on ${date}`
      );
      return res.redirect("back");
    }

    //create new interview
    const newInterview = await Interview.create(req.body);
    if (!newInterview) {
      req.flash("error", "cannot schudule inetrview , please try again");
      return res.redirect("back");
    }
    //push new interview to student array
    const studentarr = await Student.findById(student);
    studentarr.interviews.push(newInterview._id);
    await studentarr.save();
    req.flash("success", "Interview Scheduled");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error(err);
    return res.end();
  }
};

//update interview status
module.exports.updateStatus = async function (req, res) {
  const { status, interview: interviewID } = req.body;
  if (!(status && interviewID)) {
    req.flash("error", "please fill all details");
    return res.redirect("back");
  }
  try {
    //find interview detials
    const interviewDetails = await Interview.findById(interviewID);
    if (!interviewDetails) {
      req.flash("error", "cannot find clicked interview");
      return res.redirect("back");
    }
    //change status and save
    interviewDetails.result = status;
    await interviewDetails.save();
    req.flash("success", "Status updated");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error(err);
    return res.end();
  }
};

//render individual company and list of students applied for it
module.exports.companyDashboard = async function (req, res) {
  const { companyName } = req.params;
  if (!companyName) {
    req.flash("error", "could not find company");
    return res.redirect("back");
  }
  try {
    //Add student in DB
    const interviewDetails = await Interview.find({
      company: companyName,
    }).populate("student");

    if (!interviewDetails) {
      req.flash("error", "cannot find interview details");
      return res.redirect("back");
    }

    req.flash("success", "list of students attended found");
    res.render("companyInterviewPage", {
      tableHeader: `List of students  for ${companyName}`,
      interviews: interviewDetails,
    });
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error(err);
    return res.end();
  }
};

//for external jobs getting data from api and rendering
module.exports.externalJobs = async function (req, res) {
  try {
    const response = await axios.get(
      `https://www.themuse.com/api/public/jobs?page=1&location=india`
    );
    req.flash("success", "you are now in external jobs page");
    res.render("externalJobsPage", {
      jobs: response.data.results,
    });
  } catch (err) {
    req.flash("error", "something went wrong");
    console.error(err);
    return res.end();
  }
};
