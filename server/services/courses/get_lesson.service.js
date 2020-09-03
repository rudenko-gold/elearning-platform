const { get_lesson_by_id } = require("../../resources/db/courses/get_lesson.resource");

const get_lesson = async ({ lesson_id }) => {
    const { error, result } = await get_lesson_by_id({ lesson_id }); 

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.get_lesson = get_lesson;