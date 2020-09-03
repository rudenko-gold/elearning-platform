const { create_course } = require("../../services/courses/create.service");

const onCreateCourse = async (req) => {
    if (req.user._user_type == "student") {
        return { error: { status: 400, message: "Students can't create new group."} };
    }

    const { error, result } = await create_course({
        title: req.body.title, 
        owner_id: req.user._id,
        description: req.body.description,
        group_id: req.body.group_id
    });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onCreateCourse = onCreateCourse;