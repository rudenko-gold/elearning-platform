const { add_done_task } = require("../../services/courses/add_done_task.service");

const onAddDoneTask = async (req) => {
    if (req.user._user_type === "teacher") {
        return { error: "Teacher can't add solution to tasks." };
    }

    const { error, result } = await add_done_task({ 
        student_id: req.user._id, 
        lesson_id: req.body.lesson_id,
        solution_url: req.body.solution_url
    });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onAddDoneTask = onAddDoneTask;