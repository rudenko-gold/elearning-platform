const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const lesson_schema = new Schema({
    owner: ObjectId,
    course_id: ObjectId,
    title: String,
    description: String,
    deadline: Date,
    task_url: String,
    max_mark: Number
});

module.exports = mongoose.model('Lesson', lesson_schema);