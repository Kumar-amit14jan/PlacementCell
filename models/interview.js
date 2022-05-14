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
    students :[{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Student'
    }],
    result:[{
        type : mongoose.Schema.Types.ObjectId,
        ref :'Result'
    }]
},{timestamps : true});
const Interview = mongoose.model('Interview' , interview);
module.exports = Interview;