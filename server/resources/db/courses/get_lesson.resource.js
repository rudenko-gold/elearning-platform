const LessonModel = require("../model/lesson");

const get_lesson_by_id = async ({ lesson_id }) => {
    const lesson = await LessonModel.findOne({ _id: lesson_id });

    if (lesson) {
        return { result: lesson };
    } else {
        return { error: "Lesson isn't exist." };
    }
} 

module.exports.get_lesson_by_id = get_lesson_by_id;