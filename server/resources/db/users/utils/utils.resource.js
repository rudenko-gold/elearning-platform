const TeacherModel = require("../../model/teacher");
const StudentModel = require("../../model/student");
const ObjectId = require("mongoose").Types.ObjectId;

const get_student_by_email = async ({ email }) => {
    const student = await StudentModel.findOne({ email });
    return student._id;
}

const get_teacher_by_email = async ({ email }) => {
    const teacher = await TeacherModel.findOne({ email });
    return teacher._id;
}

const get_user_by_id = async ({ id, user_type }) =>{
    if (user_type == "student") {
        const student = await StudentModel.findOne( { _id: ObjectId(id) });
        return student;
    } else {
        const teacher = await TeacherModel.findOne( { _id: ObjectId(id) });
        return teacher;
    }
}

module.exports.get_student_by_email = get_student_by_email;
module.exports.get_teacher_by_email = get_teacher_by_email;
module.exports.get_user_by_id = get_user_by_id;