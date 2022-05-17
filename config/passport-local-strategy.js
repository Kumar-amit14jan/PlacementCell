const passport = require('passport');
const passportLocals = require('passport-local').Strategy;
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
let passportcallback = async function (email, password, done) {
    try {
        const employeePresent = await Employee.findOne({ email: email });
        const validate = await bcrypt.compare(password, employeePresent.password);
        if (!employeePresent || !validate) {
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
        const employeeLogin = await Employee.findOne({ email: email });
        return done(null, employeeLogin);
    } catch (error) {
        return done(error);
    }
}
passport.deserializeUser(deserializeUserCallback);
//now check user is authenticated or not
passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains user details
        return next();
    }
    return res.redirect('/');
}

module.exports = passport;