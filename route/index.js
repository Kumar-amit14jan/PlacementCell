const express = require('express');
const router = express.Router();
console.log('Router is running');
const employee = require('../controller/employee');
router.get('/', employee.SignInPage);
router.get('/sign_in' , employee.SignIn);
router.get('/signUp' , employee.createSessionPage);
router.post('/create_session' , employee.createSession);
module.exports = router;