const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const done_task_schema = new Schema({
    owner: ObjectId,
    teacher_id: ObjectId,
    lesson_id: ObjectId,
    solution_url: String,
    submision_time: Date,
    total_mark: { type: Number, default: -1 }
});

module.exports = mongoose.model("Done_Task", done_task_schema);