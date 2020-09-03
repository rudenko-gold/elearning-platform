const TeacherModel = require("../../model/teacher");
const StudentModel = require("../../model/student");

const add_teacher = async ({ first_name, last_name, email, password }) => {
    const teacher = new TeacherModel({ first_name, last_name, email, password });

    // Checking if the teacher is already in the database
    const emailExist = await TeacherModel.findOne({ email });

    if (emailExist) {
        return { error: "Email already exist" };
    }

    try {
        const saved_teacher = await teacher.save();
        return { result: saved_teacher };
    } catch (error) {
        return { error };
    }
}

const add_student = async ({ first_name, last_name, email, password }) => {
    const student = new StudentModel({ first_name, last_name, email, password });

    // Checking if the student is already in the database
    const emailExist = await StudentModel.findOne({ email });

    if (emailExist) {
        return { error: "Email already exist" };
    }

    try {
        const saved_student = await student.save();
        return { result: saved_student };
    } catch (error) {
        return { error };
    }
}

module.exports.add_student = add_student;
module.exports.add_teacher = add_teacher;