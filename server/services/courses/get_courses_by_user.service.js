const { get_courses_by_student } = require("../../resources/db/courses/get_courses_by_student.resource");
const { get_courses_by_teacher } = require("../../resources/db/courses/get_courses_by_teacher.resource");

const get_courses_by_user = async ({ user_id, user_type }) => {
    if (user_type === "student") {
        const { error, result } = await get_courses_by_student({ user_id });

        if (error) {
            return { error };
        } else {
            return { result };
        }
    } else if (user_type === "teacher") {
        const { error, result } = await get_courses_by_teacher({ user_id });

        if (error) {
            return { error };
        } else {
            return { result };
        }
    } else {
        return { error : "Unexpected user type." };
    }
}

module.exports.get_courses_by_user = get_courses_by_user;