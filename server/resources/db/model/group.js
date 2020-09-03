const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const group_schema = new Schema({
    owner: ObjectId,
    members: { type: [ObjectId], default: [] },
    courses: { type: [ObjectId], default: [] },
    title: String
});

module.exports = mongoose.model('Group', group_schema);