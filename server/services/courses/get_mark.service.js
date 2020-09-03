const { get_mark_by_lesson } = require("../../resources/db/courses/get_mark_by_lesson");

const get_mark = async ({ student_id, lesson_id }) => {
    const { result, error } = await get_mark_by_lesson({ student_id, lesson_id });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.get_mark = get_mark;