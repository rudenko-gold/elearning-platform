const { get_groups_by_teacher } = require("../../resources/db/groups/get.resource");

const get_groups = async ({ teacher_id }) => {
    const { error, result } = await get_groups_by_teacher({ teacher_id });

    if (error) {
        return { error }; 
    } else {
        return { result };
    }
}

module.exports.get_groups = get_groups;