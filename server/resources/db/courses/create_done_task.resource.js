const DoneTaskModel = require("../model/done_task");
const ObjectId = require("mongoose").Types.ObjectId;
const LessonModel = require("../model/lesson");

const create_done_task = async ({ student_id, lesson_id, solution_url, submision_time }) => {
    const task = await DoneTaskModel.findOne({ owner: ObjectId(student_id), lesson_id: ObjectId(lesson_id) });

    if (task) {
        task.solution_url = solution_url;
        task.submision_time = submision_time;

        try {
            const saved_task = await task.save();

            return { result: saved_task };
        } catch(error) {
            return { error };
        }
    }
    const lesson = await LessonModel.findOne({ _id: ObjectId(lesson_id)});
    let teacher_id;
    if (lesson) {
        teacher_id = lesson.owner;
    } else {
        return { error: "Lesson isn't exist." };
    }

    const done_task = new DoneTaskModel({ owner: ObjectId(student_id), lesson_id: ObjectId(lesson_id), solution_url, submision_time, teacher_id });

    try {
        const saved_done_task = await done_task.save();

        return { result: saved_done_task };
    } catch (error) {
        return { error };
    }
}

module.exports.create_done_task = create_done_task;