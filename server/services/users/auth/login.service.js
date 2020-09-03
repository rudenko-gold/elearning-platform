const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { get_teacher_by_email, get_student_by_email } = require("../../../resources/db/users/auth/login.resource");
const { login_validation } = require("../../validation/user_validation");

const login_teacher = async ({ email, password }) => {
    // Data validation
    const { validation_error } = login_validation({ email, password });

    if (validation_error) {
        return validation_error;
    } 
    const { result: teacher, error } = await get_teacher_by_email(email);

    if (!teacher) {
        return { error };
    }

    const validPass = await bcrypt.compare(password, teacher.password);

    if (!validPass) {
        return { error: "Password is invalid" };
    }

    const token = jwt.sign({ _id: teacher._id, _user_type: "teacher" }, process.env.TOKEN_SECRET);

    return { result: token };
}

const login_student = async ({ email, password }) => {
    // Data validation
    const { validation_error } = login_validation({ email, password });

    if (validation_error) {
        return validation_error;
    } 
    const { result: student, error } = await get_student_by_email(email);

    if (!student) {
        return { error };
    }

    const validPass = await bcrypt.compare(password, student.password);

    if (!validPass) {
        return { error: "Password is invalid" };
    }

    const token = jwt.sign({ _id: student._id, _user_type: "student" }, process.env.TOKEN_SECRET);

    return { result: token };
}

module.exports.login_student = login_student;
module.exports.login_teacher = login_teacher;