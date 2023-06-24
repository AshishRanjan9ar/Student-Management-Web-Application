const customFlashMware = require("./set-flash");
const { employeeRegisterPrechecks } = require("./employee");
const { studentRegisterPrechecks } = require("./student");
module.exports = {
  customFlashMware,
  employeeRegisterPrechecks,
  studentRegisterPrechecks,
};
