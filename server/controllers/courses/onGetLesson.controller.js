const { get_lesson } = require("../../services/courses/get_lesson.service");

const onGetLesson = async (req) => {
    if (!req.header("lesson-id")) {
        return { error: "Invalid lesson id." };
    }

    const { error, result } = await get_lesson({ lesson_id: req.header("lesson-id")});
    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onGetLesson = onGetLesson;