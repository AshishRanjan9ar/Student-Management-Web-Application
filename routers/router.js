const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../controllers/controller');
const studentControll = require('../controllers/studentController');
const interviewController = require('../controllers/InterviewController')
//router to display homepage
router.get('/', controller.home);
//router to display login page
router.get('/login', controller.login);
//router to display register page
router.get('/register', controller.register);
//router to display changer password page
router.get('/change-password', controller.changePass);
//router to change password
router.post('/changed', controller.change);
//router to add employee in db
router.post('/addEmployee', controller.add);
//router to create session
router.post('/createSession',passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    failureFlash: 'Invalid username or passwerd.'
    
}), controller.createSession);
//router to display students page
router.get('/students', passport.checkAuthentication, studentControll.students);
//router to add student in list
router.post('/addStudent', studentControll.addStudent);
//router to allocate interview for student
router.get('/allocate/:id', interviewController.allocateStud);
//router to add interview
router.post('/addInterview', interviewController.addInterview);
//router to update result of interview
router.get('/update/:id/:val', interviewController.updateStatus);
//router to redner allocation page and displaying list of interview
router.get('/allocate', passport.checkAuthentication, interviewController.allocate);
//router to sing-out
router.get('/sign-out', controller.signOut);
//router to use other export router
router.use(require('./export'));
//router to delte student details from student list
router.get('/delete/:id', studentControll.delete);
//router to delte interview from interview list
router.get('/deleteInterview/:id', interviewController.delete);
module.exports = router;