const { get_teacher_done_tasks_by_id } = require("../../resources/db/courses/get_done_tasks_by_id.resource");

const get_teacher_done_tasks = async ({ teacher_id }) => {
    const { result, error } = await get_teacher_done_tasks_by_id({ teacher_id });

    if (error) {
        return { error }; 
    } else {
        return { result };
    }
}

module.exports.get_teacher_done_tasks = get_teacher_done_tasks;