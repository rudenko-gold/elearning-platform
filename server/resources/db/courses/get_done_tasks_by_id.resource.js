const DoneTaskModel = require("../model/done_task");
const LessonModel = require("../model/lesson");
const StudentModel = require("../model/student");
const CourseModel = require("../model/course");

const { get_lesson_by_id } = require("./get_lesson.resource");

const ObjectId = require("mongoose").Types.ObjectId;

const get_student_done_tasks_by_id = async ({ student_id }) => {
    let marked_tasks = [];
    let unmarked_tasks = [];
    
    for await (const done_task of DoneTaskModel.find({  student_id: ObjectId(student_id) })) {
        if (done_task.total_mark == -1) {
            unmarked_tasks.push(done_task);
        } else {
            marked_tasks.push(done_task);
        }
    }

    return { result: { marked_tasks, unmarked_tasks }};
}

const get_teacher_done_tasks_by_id = async ({ teacher_id }) => {
    let marked_tasks = [];
    let unmarked_tasks = [];
    
    for await (const done_task of DoneTaskModel.find({ teacher_id: ObjectId(teacher_id) })) {
        if (done_task.total_mark == -1) {
            const lesson_id = done_task.lesson_id;
            const lesson = await get_lesson_by_id({ lesson_id });

            const course_id = lesson.course_id;
            const course = await CourseModel.findOne({ _id: course_id });

            const owner_id = done_task.owner;
            const student = await StudentModel.findOne({ _id: owner_id });

            const student_name = student.first_name + " " + student.last_name;

            unmarked_tasks.push({ id: done_task._id, total_mark: done_task.total_mark, lesson, course, student_name, solution_url: done_task.solution_url, submision_time: done_task.submision_time });
        } else {
            const lesson_id = done_task.lesson_id;
            const lesson = await get_lesson_by_id({ lesson_id });

            const course_id = lesson.course_id;
            const course = await CourseModel.findOne({ _id: course_id });

            const owner_id = done_task.owner;
            const student = await StudentModel.findOne({ _id: owner_id });

            const student_name = student.first_name + " " + student.last_name;

            marked_tasks.push({ id: done_task._id, total_mark: done_task.total_mark, lesson, course, student_name, solution_url: done_task.solution_url, submision_time: done_task.submision_time });
        }
    }

    return { result: { marked_tasks, unmarked_tasks }};
}

module.exports.get_student_done_tasks_by_id = get_student_done_tasks_by_id;
module.exports.get_teacher_done_tasks_by_id = get_teacher_done_tasks_by_id;