//*requiring express and other packages
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
//*Define PORT where server needs to run
const hostname = "0.0.0.0";
const PORT = 5000;

//*Requiring configs
const { db, passportLocal } = require("./configs");
const { SESSION_SECRET_KEY } = require("./secretKeys");

//* set up the view engine and static folder
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./assets"));

//*MIDDLEWARES

//bodyparseer:used to process data sent in an HTTP request body
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));
const { customFlashMware } = require("./middlewares");

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "placement-cell",
    secret: SESSION_SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: `mongodb://127.0.0.1:27017/Placement-cell`,
      autoRemove: "disabled",
    }),
    function(err) {
      console.log(err || "connect-mongodb setup ok");
    },
  })
);
//initializing passport
app.use(passport.initialize());
app.use(passport.session());
// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);
//for flash notifications
app.use(flash());
app.use(customFlashMware.setFlash);

//using expresss router
app.use("/", require("./routes"));

//express app listening on defined PORT
app.listen(PORT, (err) => {
  err
    ? console.error("Error while starting app")
    : console.log("Server started on port", PORT);
});
