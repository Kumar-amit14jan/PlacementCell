const Interview = require('../models/interview');
const Student = require('../models/student');
const Result = require('../models/result');
module.exports.resultPage = async function (req, res) {
    const id = req.params.id;
    const companyResult = await Interview.findById(id).populate('students');
    return res.render('result', {
        title: "Result",
        companyResult: companyResult
    });
}

module.exports.update = async function (req, res) {
    try {
        console.log(req.body.result);
        const updateResult = await Result(req.body);
        await updateResult.save();
        const id = req.body.interviewId;
        const interviewResult = await Interview.findById(id);
        const index = interviewResult.result.indexOf(req.body.studentId);
        if (index == -1) {
            interviewResult.result.push(req.body.studentId);
            await interviewResult.save();
        }
        if(req.body.result == "PASS"){
            const sid = req.body.studentId;
            const studentPresent = await Student.findById(sid);
            studentPresent.status = "placed";
            await studentPresent.save();
        }
        return res.redirect('back');
    } catch (error) {
        return res.send("Error in updating data")
    }
}