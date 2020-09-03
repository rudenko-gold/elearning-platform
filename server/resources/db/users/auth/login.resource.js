const TeacherModel = require("../../model/teacher");
const StudentModel = require("../../model/student");

const get_teacher_by_email = async (email) => {
    const teacher = await TeacherModel.findOne({ email });

    if (!teacher) {
        return { error : "Email is not found" };
    } else {
        return { result: teacher };
    }
}

const get_student_by_email = async (email) => {
    const student = await StudentModel.findOne({ email });

    if (!student) {
        return { error : "Email is not found" };
    } else {
        return { result: student };
    }
}

module.exports.get_student_by_email = get_student_by_email;
module.exports.get_teacher_by_email = get_teacher_by_email;