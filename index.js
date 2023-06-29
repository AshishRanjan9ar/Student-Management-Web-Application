const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const port = process.env.PORT;
const ejs = require('ejs');
const mongoose = require('mongoose');
const MongoDB = require('mongodb');
const db = require('./config/mongoose_conn');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const cm = require('./config/cusMiddleware');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }
//requiring ejs module layouts
var expressLayouts = require('express-ejs-layouts');
app.use(express.static('assets'));
//body-parser
app.use(express.urlencoded({
    extended: true
}));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(session({
    secret: 'newProject',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    ,
    // store: MongoStore.create({
    //     mongoUrl: "mongodb+srv://krn0869:karan0869@cluster0.pmwmctd.mongodb.net/?retryWrites=true&w=majority"
    // })
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://krn0869:karan0869@cluster0.pmwmctd.mongodb.net/?retryWrites=true&w=majority",
    })
}));
app.use(flash());
app.use(cm.setFlash);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routers/router'));
// connectDB().then(() => {
//     app.listen(process.env.PORT,() => {
//         console.log("listening for requests");
//     })
// })

app.listen(process.env.PORT, () => {
    console.log('I am listening');
})