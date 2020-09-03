const GroupModel = require("../model/group");
const StudentModel = require("../model/student");
const ObjectId = require("mongoose").Types.ObjectId;

const add_student_to_group = async ({ student_id, teacher_id, group_id }) => {
    const student = await StudentModel.findOne({ _id: ObjectId(student_id) });
    const group = await GroupModel.findOne({ _id: group_id});

    /*
    if (StudentModel.findOne({ groups: { "$in": [group._id]}})) {
        return { error: "Student is already in the group." };
    }
    */

    if (!student) {
        return { error: "Student isn't exist." };
    }
    
    if (!group) {
        return { error: "Group isn't exist." };
    }

    if (String(group.owner) != teacher_id) {
        return { error: "Invalid owner."};    
    }

    try {
        student.groups.push(group._id);
        await student.save();

        group.members.push(student._id);
        await group.save();

        return { result: "Student has added!" };
    } catch(error) {
        return { error };
    } 
}

module.exports.add_student_to_group = add_student_to_group;