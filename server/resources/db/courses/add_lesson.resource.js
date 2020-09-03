const CourseModel = require("../model/course");
const GroupModel = require("../model/group");
const TeacherModel = require("../model/teacher");
const LessonModel = require("../model/lesson");
const ObjectId = require("mongoose").Types.ObjectId;

const add_lesson_to_course = async ({ owner_id, course_id, title, description, deadline, task_url, max_mark }) => {
    const course = await CourseModel.findOne({ _id: ObjectId(course_id), owner: ObjectId(owner_id) });

    if (!course) {
        return { error: "Course isn't exist." };
    }
    
    const lessonExist = await LessonModel.findOne({ title, course: ObjectId(course_id) });

    if (lessonExist) {
        return { error: "Lesson with the same title is already exist in this course." };
    }

    const lesson = new LessonModel({
        title,
        description,
        deadline,
        task_url,
        owner: ObjectId(owner_id),
        course: ObjectId(course_id),
        max_mark
    });

    try {
        const saved_lesson = await lesson.save();
        course.lessons.push(saved_lesson._id);
        await course.save();

        return { result: saved_lesson };
    } catch(error) {
        return { error };    
    }

}

module.exports.add_lesson_to_course = add_lesson_to_course;