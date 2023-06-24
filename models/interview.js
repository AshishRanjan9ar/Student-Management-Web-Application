const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    // company: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Company",
    // },
    company: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    date: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      enum: [
        "Applied",
        "On Hold",
        "Selected",
        "Pending",
        "Not Selected",
        "Did Not Attempt",
      ],
      default: "Applied",
    },
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
