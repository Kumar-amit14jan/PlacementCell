const mongoose = require('mongoose');
const interview = new mongoose.Schema({
    companyName :{
        type : String,
        required : true
    },
    date :{
        type : Date,
        default : Date.now()
    },
    reault :{
        type : String,
        enum : ['PASS' , 'FAIL' , 'On Hold' , 'Didnot Attemp'],
        default : 'On Hold'
    },
    student :[{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Student'
    }]
},{timestamps : true});
const Interview = mongoose.model('Interview' , interview);
module.exports = Interview;