const { get_done_task_by_id } = require("../../resources/db/courses/get_done_task_by_id.resource");

const get_done_task = async ({ done_task_id }) => {
    const { error, result } = get_done_task_by_id({ done_task_id });

    if (error) {
        return { error }; 
    } else {
        return { result };
    }
}

module.exports.get_done_task = get_done_task;