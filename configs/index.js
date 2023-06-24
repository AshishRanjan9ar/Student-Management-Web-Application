const { db } = require("./mongoose");
const { passport: passportLocal } = require("./passport-local-strategy");
module.exports = {
  db,
  passportLocal,
};
