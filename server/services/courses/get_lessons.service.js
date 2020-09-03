const { get_lessons_by_course } = require("../../resources/db/courses/get_lessons_by_course.resource");

const get_lessons = async({ course_id }) => {
    const { error, result } = await get_lessons_by_course({ course_id });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.get_lessons = get_lessons;