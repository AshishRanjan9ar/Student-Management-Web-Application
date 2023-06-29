const CsvParser = require('json2csv').Parser;
const Interview = require('../models/Interview');
const Student = require('../models/student');
//function to export data as csv
module.exports.exp = async (req, res) => {
    try {
        let interviews = [];
        const interviewData = await Interview.find({}).populate('student_id');
        interviewData.forEach((interview) => {
            console.log(interview);

            var obj = {
                student_id: interview.student_id.id,
                student_name: interview.student_id.student_name,
                batch: interview.student_id.batch,
                college_name: interview.student_id.college_name,
                dsa: interview.student_id.course_score.dsa,
                webdev: interview.student_id.course_score.webdev,
                react: interview.student_id.course_score.react,
                status: interview.student_id.student_status,
                company_name: interview.company_name,
                date: new Date(interview.date),
                result: interview.result,
            }
            const {
                student_id,
                student_name,
                batch,
                college_name,
                dsa,
                webdev,
                react,
                status,
                company_name,
                date,
                result
            } = obj;
            interviews.push({
                student_id,
                student_name,
                batch,
                college_name,
                dsa,
                webdev,
                react,
                status,
                company_name,
                date,
                result
            });
        });
        const csvFields = ['ID', 'Student_name', 'Batch', 'College_name', 'DSA', 'Webdev', 'React', 'Status', 'Company_name', 'Date', 'Result'];
        const csvParser = new CsvParser({
            csvFields
        });
        const csvData = csvParser.parse(interviews);
        res.setHeader('Content-Type', "text/csv");
        res.setHeader("content-Disposition", "Attatchment:filename=st.csv");
        res.status(200).end(csvData);
    } catch (err) {
        console.log(err);
    }
}