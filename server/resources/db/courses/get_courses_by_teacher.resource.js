const CourseModel = require("../model/course");
const GroupModel = require("../model/group");
const TeacherModel = require("../model/teacher");
const ObjectId = require("mongoose").Types.ObjectId;

const get_courses_by_teacher = async ({ user_id }) => {
    const user = await TeacherModel.findOne({ _id: ObjectId(user_id) });

    if (!user) {
        return { error: "Teacher isn't exist." };
    }

    const courses_list = [];
    const groups = user.groups;

    for (var i = 0; i < groups.length; ++i) {
        const group_id = groups[i];
        const group = await GroupModel.findOne({ _id: ObjectId(group_id)});
        const courses = group.courses;

        for (var j = 0; j < courses.length; ++j) {
            const course_id = courses[j];
            
            const course = await CourseModel.findOne({ _id: ObjectId(course_id)});
            courses_list.push({ id: course._id, title: course.title, description: course.description, group_title: group.title });
        }
    }
    return { result: courses_list };
}

module.exports.get_courses_by_teacher = get_courses_by_teacher