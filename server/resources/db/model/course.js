const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const course_schema = new Schema({
    owner: ObjectId,
    lessons: { type: [ObjectId], default: [] },
    group: ObjectId,
    title: String,
    description: String,
});

module.exports = mongoose.model('Course', course_schema);