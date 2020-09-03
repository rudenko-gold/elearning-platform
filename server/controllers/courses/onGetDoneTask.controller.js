const { get_done_task } = require("../../services/courses/get_done_task.service");

const onGetDoneTask = async (req) => {
    const { error, result } = await get_done_task({ done_task_id: req.header("done_task_id") });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onGetDoneTask = onGetDoneTask;