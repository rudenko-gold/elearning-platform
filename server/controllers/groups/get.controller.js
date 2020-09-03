const { get_groups } = require("../../services/groups/get_groups.service");

const onGetGroups = async (req) => {
    if (req.user._user_type == "student") {
        return { error: { status: 400, message: "Students can't have groups."} };
    }

    const { result, error } = await get_groups({ teacher_id: req.user._id });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onGetGroups = onGetGroups;