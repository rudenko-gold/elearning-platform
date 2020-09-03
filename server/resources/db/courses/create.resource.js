const CourseModel = require("../model/course");
const GroupModel = require("../model/group");
const TeacherModel = require("../model/teacher");
const ObjectId = require("mongoose").Types.ObjectId;

const add_course = async ({ title, description, group_id, owner_id }) => {
    const group = await GroupModel.findOne({ _id: ObjectId(group_id) });
    const teacher = await TeacherModel.findOne({ _id: ObjectId(owner_id) });
    const courseExist = await CourseModel.findOne({ group_id: ObjectId(group_id), title });

    const course = new CourseModel({ title, owner: ObjectId(owner_id), group: ObjectId(group_id), description });

    if (!group) {
        return { error: "Group isn't exist." };
    }

    if (!teacher) {
        return { error: "Teacher isn't exist." };
    }

    if (courseExist) {
        return { error: "Course with the same title and group is already exist." };
    }

    try {
        const saved_course = await course.save();
        group.courses.push(saved_course._id);
        teacher.courses.push(saved_course._id);
        
        await teacher.save();
        await group.save();
        
        return { result: saved_course };
    } catch (error) {
        return { error };
    }
}

module.exports.add_course = add_course;