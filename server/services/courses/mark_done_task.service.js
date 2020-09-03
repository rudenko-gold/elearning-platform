const { change_mark_of_done_task } = require("../../resources/db/courses/change_mark_of_done_task.resource");

const mark_done_task = async ({ done_task_id, mark }) => {
    const { error, result } = await change_mark_of_done_task({ done_task_id, new_mark: mark });
    
    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.mark_done_task = mark_done_task;