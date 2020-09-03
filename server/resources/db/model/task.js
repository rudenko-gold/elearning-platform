const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const task_schema = new Schema({
    owner: ObjectId,
    lesson_id: ObjectId,
    done_time: Date,
    task_url: String,
    mark: Number
});

module.exports = mongoose.model('Task', task_schema);