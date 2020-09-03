const DoneTaskModel = require("../model/done_task");
const ObjectId = require("mongoose").Types.ObjectId;

const change_mark_of_done_task = async ({ done_task_id, new_mark }) => {
    const done_task = await DoneTaskModel.findOne({ _id: ObjectId(done_task_id) });
    done_task.total_mark = new_mark;
    console.log(done_task.total_mark);
    try {
        const saved_done_task = done_task.save();

        return { result: saved_done_task };
    } catch (error) {
        return { error };
    }
}

module.exports.change_mark_of_done_task = change_mark_of_done_task;