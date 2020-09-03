const GroupModel = require("../model/group");
const TeacherModel = require("../model/teacher");
const ObjectId = require("mongoose").Types.ObjectId;

const get_groups_by_teacher = async ({ teacher_id }) => {
    const teacher = await TeacherModel.findOne({ _id: ObjectId(teacher_id) });

    if (!teacher) {
        return { error: "Teacher isn't exist." };
    }

    const groups = teacher.groups;
    
    const groups_list = [];

    for (var i = 0; i < groups.length; i++) {
        const group_id = groups[i]._id;
        const group = await GroupModel.findOne({ _id: group_id });

        groups_list.push({ _id: group_id, title: group.title });
    }

    return { result: groups_list };
}

module.exports.get_groups_by_teacher = get_groups_by_teacher;