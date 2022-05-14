const mongoose = require('mongoose');
const result = new mongoose.Schema({
    result :{
        type : String,
        enum : ['PASS' , 'FAIL' , 'On Hold' , 'Didnot Attemp'],
        default : 'On Hold'
    },
    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Student'
    },
    interviewId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Interview'
    }
},{timestamps : true});
const Result = mongoose.model('Result' , result);
module.exports = Result;