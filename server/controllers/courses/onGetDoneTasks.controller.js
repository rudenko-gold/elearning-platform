const { get_teacher_done_tasks } = require("../../services/courses/get_done_tasks.service");

const onGetDoneTasks = async (req) => {
    const { result, error } = await get_teacher_done_tasks({ teacher_id: req.user._id });

    if (error) {
        return { error }; 
    } else {
        return { result };
    }
}

module.exports.onGetDoneTasks = onGetDoneTasks;