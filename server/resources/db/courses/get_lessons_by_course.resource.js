const TeacherModel = require("../model/teacher");
const CourseModel = require("../model/course");
const LessonModel = require("../model/lesson");
const ObjectId = require("mongoose").Types.ObjectId;

const get_lessons_by_course = async ({ course_id }) => {
    const course = await CourseModel.findOne({ _id: ObjectId(course_id)});

    if (!course) {
        return { error: "Course isn't exist!" };
    }

    const lessons = course.lessons;
    let lessons_list = [];
    for (let i = 0; i < lessons.length; i++) {
        const lesson_id = lessons[i];
        const lesson = await LessonModel.findOne({ _id: lesson_id });

        lessons_list.push({ 
            id: lesson._id,
            title: lesson.title,
            description: lesson.description,
            max_mark: lesson.max_mark,
            deadline: lesson.deadline,
            task_url: lesson.task_url
        });
    }

    return { result: lessons_list };
}

module.exports.get_lessons_by_course = get_lessons_by_course;