const mongoose = require('mongoose');
const employee = new mongoose.Schema({
    firstname:{
        type : String,
        required : true
    },
    lastname:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique:true
    },
    password : {
        type : String,
        required : true
    }
},{timestamps : true});
const Employee = mongoose.model('Employee' ,employee);
module.exports = Employee;