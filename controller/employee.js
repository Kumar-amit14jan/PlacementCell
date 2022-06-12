const Employee = require('../models/employee');
const validator = require('validator');
//sign in page for employee
module.exports.SignInPage = async function (req, res) {
    return res.render('signIn', {
        title: "SignIn"
    });
}
module.exports.SignIn = async function (req, res) {
    try {
        req.flash('success', 'Sign In SuccessFully');
        return res.redirect('/employee/dashboard');
    } catch (error) {
        return res.send('<h1>Error in SignIn</h1>');
    }
}
// sign up page for employee
module.exports.createSessionPage = async function (req, res) {

    return res.render('signUp', {
        title: "Sign Up",
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: ""
    });
}
module.exports.createSession = async function (req, res) {
    try {
        if (req.body.firstname.length === 0) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: 'FirstName cannot blank',
                lastNameError: "",
                emailError: "",
                passwordError: ""
            });
        }
        if (!isNaN(req.body.firstname)) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: 'FirstName is not number',
                lastNameError: "",
                emailError: "",
                passwordError: ""
            });
        }
        // for lastname
        if (req.body.lastname.length === 0) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: 'LastName is not empty',
                emailError: "",
                passwordError: ""
            });
        }
        if (!isNaN(req.body.lastname)) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: 'LastName is not number',
                emailError: "",
                passwordError: ""
            });
        }
        // check on email
        if (!validator.isEmail(req.body.email)) {
            req.flash('error', '');
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: "",
                emailError: 'Please Enter Valid Email'
            });
        } else if (req.body.password.length < 2) {
            return res.render('signUp', {
                title: "Sign Up",
                firstNameError: "",
                lastNameError: "",
                emailError: "",
                passwordError: 'Password is Small !!'
            });
        } else {
            const employeePresent = await Employee.findOne({ email: req.body.email });
            if (employeePresent) {
                req.flash('error', 'Employee Already Exist !!');
                return res.redirect('/');
            } else {
                const registerEmployee = await Employee(req.body);
                registerEmployee.save();
                req.flash('success', 'Sign Up SuccessFully !!');
                return res.redirect('/');
            }
        }
    } catch (error) {
        return res.send("<h1>Error in SignUp</h1>");
    }


}

// to sign out
module.exports.SignOut = async function (req, res) {
    req.logout();
    req.flash('success', 'Sign Out SuccessFully');
    return res.redirect('/');
}