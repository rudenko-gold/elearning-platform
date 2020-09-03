const { get_deadlines } = require("../../services/courses/get_deadlines.service");

const onGetDeadlines = async (req) => {
    if (req.user._user_type === "teacher") {
        return { error: "Teachers dont't have deadlines." };
    }

    const { error, result } = await get_deadlines({ user_id: req.user._id });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onGetDeadlines = onGetDeadlines;