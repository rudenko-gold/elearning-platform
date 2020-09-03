const { add_lesson_to_course } = require("../../resources/db/courses/add_lesson.resource");

const add_lesson = async ({ owner_id, course_id, title, description, deadline, task_url, max_mark }) => {
    // to-do validation

    const { error, result } = await add_lesson_to_course({ owner_id, course_id, title, description, deadline, task_url, max_mark });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.add_lesson = add_lesson; 