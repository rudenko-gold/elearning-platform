const { get_lessons_by_course } = require("../../resources/db/courses/get_lessons_by_course.resource");
const { get_courses_by_student } = require("../../resources/db/courses/get_courses_by_student.resource");

const get_deadlines = async ({ user_id }) => {
    const { result: courses_list, error: course_error } = await get_courses_by_student({ user_id });

    if (course_error) {
        return { error: course_error }; 
    }

    let deadlines = [];
    let archive = [];

    for (let i = 0; i < courses_list.length; i++) {
        const course_id = courses_list[i].id;
        const { result: lessons, error: lessons_error } = await get_lessons_by_course({ course_id });

        if (lessons_error) {
            return { error: lessons_error }; 
        } 
        
        for (let j = 0; j < lessons.length; j++) {
            const lesson_id = lessons[j].id;
            const lesson_title = lessons[j].title;
            const course_title = courses_list[i].title;
            const deadline_time = lessons[j].deadline;
            
            if (deadline_time < Date.now()) {
                archive.push({
                    lesson_id,
                    lesson_title,
                    course_title,
                    deadline_time
                });
            } else {
                deadlines.push({
                    lesson_id,
                    lesson_title,
                    course_title,
                    deadline_time
                });
            }
        }
    }

    deadlines.sort((lhs, rhs) => new Date(lhs.deadline_time).getTime() - new Date(rhs.deadline_time).getTime());
    archive.sort((rhs, lhs) => new Date(lhs.deadline_time).getTime() - new Date(rhs.deadline_time).getTime());

    return { result: {
        deadlines, archive
    }}
}

module.exports.get_deadlines = get_deadlines;