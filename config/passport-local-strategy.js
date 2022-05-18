const passport = require('passport');
const passportLocals = require('passport-local').Strategy;
const Employee = require('../models/employee');
let passportcallback = async function (req, email, password, done) {
    try {
        const employeePresent = await Employee.findOne({ email: email });

        if (!employeePresent || employeePresent.password != password ) {
            req.flash('error', 'Please Enter Valid Email & Password !');
            return done(null, false);
        }
            
            return done(null, employeePresent);
        

    } catch (error) {
        return done(error);
    }
}
passport.use(new passportLocals({ usernameField: 'email', passReqToCallback: true }, passportcallback));
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