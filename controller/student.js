const validator = require('validator');
const convertor = require('objects-to-csv');
const Student = require('../models/student');
const Interview = require('../models/interview');
const Result = require('../models/result');
// employee dashboard list
module.exports.dashboard = async function (req, res) {
    const studentList = await Student.find({});
    return res.render('employeeDashboard', {
        title: "EmployeeDashboard",
        studentList: studentList
    })
}

// add student page
module.exports.addStudentPage = async function (req, res) {
    return res.render('addStudent', {
        title: "Student"
    })
}
module.exports.addStudent = async function (req, res) {
    try {
        if (!validator.isEmail(req.body.email)) {
            return res.redirect('back');
        } else {
            const presentStudent = await Student.findOne({ email: req.body.email });
            if (presentStudent) {
                return res.redirect('back');
            } else {
                const addStudent = await Student(req.body);
                await addStudent.save();
                return res.redirect('/employee/dashboard');
            }
        }
    } catch (error) {
        return res.send('Error in adding student');
    }
}

module.exports.downloadData = async function (req, res) {
    const studentList = await Student.find({});
    const dataPresent = [];
    for (var i = 0; i < studentList.length; i++) {
        const data1 = studentList[i];
        for (var j = 0; j < data1.interviews.length; j++) {
            const id = data1.interviews[j];
            const interviewData = await Interview.findById(id);
            //find result
            var result = "On Hold";
            const resultIndex = interviewData.result.indexOf(data1.id);
            if (resultIndex != -1) {
                const resultData = await Result.find({ studentId: interviewData.result[resultIndex] });
                for (var k = 0; k < resultData.length; k++) {
                    if (resultData[k].interviewId == interviewData.id) {
                        result = resultData[k].result;
                        break;
                    }
                }
            }
            const list = {
                StudentId: data1.id,
                Batch: data1.batch,
                Name: data1.name,
                Email: data1.email,
                Status:data1.status,
                College: data1.college,
                DSA: data1.DSA_FinalScore,
                WEBD: data1.WebD_FinalScore,
                REACT: data1.React_FinalScore,
                CompanyName: interviewData.companyName,
                InterviewDate: interviewData.date.toString().substring(4, 15),
                Result: result
            };
            dataPresent.push(list);
        }
    }
    const csv = new convertor(dataPresent);
    await csv.toDisk('./studentData.csv');
    return res.download('./studentData.csv');
}