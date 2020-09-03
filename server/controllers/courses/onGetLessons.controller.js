const { get_lessons } = require("../../services/courses/get_lessons.service");

const onGetLessons = async (req) => {
    if (!req.header("course-id")) {
        return { error: "Course id is required." };
    }

    const { result, error } = await get_lessons({ course_id: req.header("course-id") });

    if (error) {
        return { error };
    } else {

        return { result };
    }
}

module.exports.onGetLessons = onGetLessons; 