const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const teacher_schema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    groups: { type: [ObjectId], default: [] },
    courses: { type: [ObjectId], default: [] }
});

module.exports = mongoose.model('Teacher', teacher_schema);