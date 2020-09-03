const { get_students } = require("../../services/groups/get_students.service");

const onGetStudents = async (req) => {
    if (req._user_type === "student") {
        return { error: "Students don't have access to groups." };
    }   

    const { result, error } = await get_students({ teacher_id: req.user._id, group_id: req.header('group_id') });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onGetStudents = onGetStudents;