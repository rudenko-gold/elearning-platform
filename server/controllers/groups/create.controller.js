const { create_group } = require("../../services/groups/create.service");

const onCreate = async (req) => {
    if (req.user._user_type == "student") {
        return { error: { status: 400, message: "Students can't create new group."} };
    }

    const { error, result } = await create_group({ title: req.body.title, owner_id: req.user._id });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.onCreate = onCreate;