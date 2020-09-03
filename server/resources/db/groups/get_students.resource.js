const GroupModel = require("../model/group");
const TeacherModel = require("../model/teacher");
const StudentModel = require("../model/student");
const ObjectId = require("mongoose").Types.ObjectId;

const get_students_in_group = async ({ owner_id, group_id }) => {
    const group = await GroupModel.findOne({ _id: ObjectId(group_id), owner: ObjectId(owner_id) });

    if (!group) {
        return { error: "Group isn't exist." };
    }

    const students_list = [];
    const students = group.members;
    for (var i = 0; i < students.length; i++) {
        const student = await StudentModel.findOne({ _id: students[i]._id });

        students_list.push({ first_name: student.first_name, last_name: student.last_name, email: student.email });
    }

    return { result: students_list };
}

module.exports.get_students_in_group = get_students_in_group;