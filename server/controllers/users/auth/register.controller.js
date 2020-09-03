const { register_student, register_teacher } = require("../../../services/users/auth/register.service");

const onRegister = async (req) => {
    if (req.body.user_type == "student") {
        const student = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        const { error, result } = await register_student(student);

        if (error) {
            return { error };
        } else {
            return { result };
        }

    } else if (req.body.user_type == "teacher") {
        const teacher = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }  

        const { error, result } = await register_teacher(teacher);

        if (error) {
            return { error };
        } else {
            return { result };
        }
    } else {
        return { error: "User type is required" };
    }
}

module.exports.onRegister = onRegister;