const { get_courses_by_student } = require("../../resources/db/courses/get_courses_by_student.resource");
const { get_student_done_tasks_by_id } = require("../../resources/db/courses/get_done_tasks_by_id.resource");

const get_student_stats = async ({ student_id }) => {
    const courses = await get_courses_by_student({ student_id });

    let total_done = 0, total_tasks = 0, sum_of_marks = 0;

    for (let i = 0; i < courses.length; i++) {
        total_tasks += courses[i].lessons.length;
    }

    const { result } = await get_student_done_tasks_by_id({ student_id });
    const marked_tasks = result.marked_tasks;
    const unmarked_tasks = result.unmarked_tasks;

    for (let i = 0; i < marked_tasks; i++) {
        total_done++;
        sum_of_marks += marked_tasks[i].mark;
    }

    return {
        total_done, total_tasks, average_mark: sum_of_marks / total_done
    };
}

module.exports.get_student_stats = get_student_stats;