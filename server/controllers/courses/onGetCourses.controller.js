const { get_courses_by_user } = require("../../services/courses/get_courses_by_user.service");

const onGetCourses = async (req) => {
    const { result, error } = await get_courses_by_user({ 
        user_type: req.user._user_type,
        user_id: req.user._id
    });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onGetCourses = onGetCourses;