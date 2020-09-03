const { mark_done_task } = require("../../services/courses/mark_done_task.service");

const onMarkDoneTask = async(req) => {
    if (req.user._user_type == "student") {
        return { error: "Students cant't mark solutions." };
    }

    const { error, result } = await mark_done_task({
        done_task_id: req.body.done_task_id,
        mark: req.body.mark
    });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onMarkDoneTask = onMarkDoneTask;