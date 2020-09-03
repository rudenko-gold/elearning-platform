const { get_mark } = require("../../services/courses/get_mark.service");

const onGetMark = async (req) => {
    if (req.user._user_type == "teacher") {
        return { error: "Teachers don't have marks." };
    }

    const { result, error } = await get_mark({ student_id: req.user._id, lesson_id: req.header("lesson_id")});

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onGetMark = onGetMark;