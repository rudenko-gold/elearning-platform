const DoneTaskModel = require("../model/done_task");
const ObjectId = require("mongoose").Types.ObjectId;

const get_done_task_by_id = async ({ done_task_id }) => {
    const done_task = await DoneTaskModel.findOne({ done_task_id: ObjectId(done_task_id) });

    if (done_task) {
        return { result: done_task }; 
    } else {
        return { error: "Done task is not found." };
    }
}

module.exports.get_done_task_by_id = get_done_task_by_id;