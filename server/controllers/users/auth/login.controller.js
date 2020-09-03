const { login_student, login_teacher } = require("../../../services/users/auth/login.service");

const onLogin = async (req) => {
    if (req.body.user_type == "student") {

        const student = {
            email: req.body.email,
            password: req.body.password
        }

        const { error, result } = await login_student(student);

        if (error) {
            return { error };
        } else {
            return { result };
        }
    } else if (req.body.user_type == "teacher") {
        const teacher = {
            email: req.body.email,
            password: req.body.password
        }  

        const { error, result } = await login_teacher(teacher);

        if (error) {
            return { error };
        } else {
            return { result };
        }
    } else {
        return { error: "User type is required" };
    }
}

module.exports.onLogin = onLogin;