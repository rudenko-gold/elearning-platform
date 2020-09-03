const { get_user } = require("../../../services/users/utils/get_user.service");

const onGetUser = async (req) => {
    if (!req.user._user_type || !req.user._id) {
        return { error: "Invalid data" };
    }

    const { result, error } = await get_user({ id: req.user._id, user_type: req.user._user_type });

    if (result) {
        return { result };
    } else {
        return { error };
    }
}

module.exports.onGetUser = onGetUser;