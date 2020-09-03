const DoneTaskModel = require("../model/done_task");

const get_mark_by_lesson = async({ student_id, lesson_id }) => {
    const done_task = await DoneTaskModel.findOne({ owner: student_id, lesson_id });
    console.log(student_id);
    console.log(lesson_id);
    if (!done_task) {
        return { result: -1 };
    } else {
        return { result: done_task.total_mark };
    }
}

module.exports.get_mark_by_lesson = get_mark_by_lesson;