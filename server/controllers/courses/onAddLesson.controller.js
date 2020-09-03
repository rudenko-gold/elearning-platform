const { add_lesson } = require("../../services/courses/add_lesson.service");

const onAddLesson = async (req) => {
    console.log(req.user);
    console.log(req.body);
    if (req.user._user_type == "student") {
        return { error: { message: "Students can't add lessons.", status: 400 } };
    }

    if (!req.user._id ||
        !req.body.course_id ||
        !req.body.title || 
        !req.body.description ||
        !req.body.deadline ||
        !req.body.task_url ||
        !req.body.max_mark) {
            return { error: "Invalid lesson." };
        }

    const { result, error } = await add_lesson({
        owner_id: req.user._id,
        course_id: req.body.course_id,
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        task_url: req.body.task_url,
        max_mark: req.body.max_mark
    });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onAddLesson = onAddLesson;