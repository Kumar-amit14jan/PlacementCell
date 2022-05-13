const validator = require('validator');
const Student = require('../models/student');
// employee dashboard list
module.exports.dashboard = async function(req , res){
    const studentList =await Student.find({});
    return res.render('employeeDashboard', {
        title :"EmployeeDashboard",
        studentList : studentList
    })
} 

// add student page
module.exports.addStudentPage = async function(req , res){
    return res.render('addStudent', {
        title : "Student"
    })
}
module.exports.addStudent = async function(req , res){
    try{
        if(!validator.isEmail(req.body.email)){
            return res.redirect('back');
        }else {
            const presentStudent = await Student.findOne({email : req.body.email});
            if(presentStudent){
                return res.redirect('back');
            }else{
                return res.redirect('/employee/dashboard');
            }
        }
    }catch(error){
        return res.send('Error in adding student');
    }
}