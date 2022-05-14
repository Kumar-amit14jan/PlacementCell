const express = require('express');
const router = express.Router();
const employeedashboard = require('../controller/student');
router.get('/dashboard', employeedashboard.dashboard)
router.get('/student', employeedashboard.addStudentPage);
router.post('/addstudent', employeedashboard.addStudent);
router.get('/download' , employeedashboard.downloadData);
module.exports = router;