const passport = require('passport');
const passportLocals = require('passport-local').Strategy;
const Employee = require('../models/employee');
let passportcallback = async function (email, password, done) {
    try {
        // console.log(req.body);
        console.log('hi passport')
        const employeePresent = await Employee.findOne({ email: email });
        if (!employeePresent || employeePresent.password != password) {
            return done(null, flase);
        }
        return done(null, employeePresent);
    } catch (error) {
        return done(error);
    }
}
passport.use(new passportLocals({ usernameField: 'email' }, passportcallback));
passport.serializeUser(function (employee, done) {
    return done(null, employee.email);
});

const deserializeUserCallback = async function (email, done) {
    try {
        const employeeLogin = await Employee.findOne({email : email});
        console.log(employeeLogin);
        return done(null , employeeLogin);
    } catch (error) {
        return done(error);
    }
}
passport.deserializeUser(deserializeUserCallback);

module.exports = passport;