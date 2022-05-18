const bcrypt= require('bcrypt');
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
        req.flash('success' , 'Sign In SuccessFully');
        return res.redirect('/employee/dashboard');
    } catch (error) {
        return res.send('<h1>Error in SignIn</h1>');
    }
}
// sign up page for employee
module.exports.createSessionPage = async function (req, res) {
    if(req.isAuthenticated()){
        return res.redirect('/employee/dashboard');
    }
    return res.render('signup', {
        title: "Sign Up"
    });
}
module.exports.createSession = async function (req, res) {
    try {
        if (!validator.isEmail(req.body.email)) {
            req.flash('error' , 'Please Enter Valid Email ');
            return res.redirect('back');
        } else if (req.body.password.length < 2) {
            req.flash('error' , 'Password is Small !!');
            return res.redirect('back');
        } else {
            const employeePresent = await Employee.findOne({ email: req.body.email });
            if (employeePresent) {
                req.flash('error' , 'Employee Already Exist !!');
                return res.redirect('back');
            } else {
                const registerEmployee = await Employee(req.body);
                registerEmployee.save();
                // generate salt
                const salt = await bcrypt.genSalt(10);
                //now set employee password to hashpassword
                registerEmployee.password = await bcrypt.hash(registerEmployee.password , salt);
                await registerEmployee.save();
                req.flash('success' , 'Sign Up SuccessFully !!');
                return res.redirect('/');
            }
        }
    } catch (error) {
        return res.send("<h1>Error in SignUp</h1>");
    }


}

// to sign out
module.exports.SignOut = async function(req ,res){
    req.logout();
    req.flash('success' , 'Sign Out SuccessFully');
    return res.redirect('/');
}