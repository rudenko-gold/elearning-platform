const { create_done_task } = require("../../resources/db/courses/create_done_task.resource");

const add_done_task = async ({ student_id, lesson_id, solution_url}) => {
    const { error, result } = await create_done_task({ student_id, lesson_id, solution_url, submision_time: Date.now()})  

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.add_done_task = add_done_task;