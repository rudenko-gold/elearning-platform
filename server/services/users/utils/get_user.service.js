const { get_user_by_id } = require("../../../resources/db/users/utils/utils.resource");

const get_user = async ({ id, user_type }) => {
    const user = await get_user_by_id({ id, user_type });
    if (user) {
        return { 
            result: {
                id: user._id,
                user_type,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            }
        }
    } else {
        return { error: "User doesn't exist." };
    }
}

module.exports.get_user = get_user;