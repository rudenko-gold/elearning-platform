const GroupModel = require("../model/group");
const TeacherModel = require("../model/teacher");
const ObjectId = require("mongoose").Types.ObjectId;


const add_group = async ({ title, owner_id }) => {
    const group = new GroupModel({ title, owner: ObjectId(owner_id) });

    const groupExist = await GroupModel.findOne({ owner: ObjectId(owner_id), title });
    const teacher = await TeacherModel.findOne({ _id: ObjectId(owner_id) });
    
    if (groupExist) {
        return { error: "Group is already exist." };
    }

    if (!teacher) {
        return { error: "Teacher isn't exist." };
    }

    try {
        const saved_group = await group.save();
        teacher.groups.push(saved_group._id);
        await teacher.save();
        return { result: saved_group };
    } catch (error) {
        return { error };
    }
}

module.exports.add_group = add_group;