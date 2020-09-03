const { add_student } = require("../../services/groups/add_student.service");

const onAddStudent = async (req) => {
    if (req.user._user_type == "student") {
        return { error: "Students can't add students to group." };
    }

    const { result, error } = await add_student({
            student_email: req.body.student_email,
            teacher_id: req.user._id,
            group_id: req.body.group_id
        });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onAddStudent = onAddStudent;