const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const student_schema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    groups: { type: [ObjectId], default: [] }
});

module.exports = mongoose.model('Student', student_schema);