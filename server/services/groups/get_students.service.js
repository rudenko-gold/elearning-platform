const { get_students_in_group } = require("../../resources/db/groups/get_students.resource");

const get_students = async ({ teacher_id, group_id }) => {
    const { result, error } = await get_students_in_group({ owner_id: teacher_id, group_id });

    if (error) {
        return { error };
    } else {
        result.sort((lhs, rhs) => {
            if (lhs.last_name === rhs.last_name) {
                if (lhs.first_name < rhs.first_name) {
                    return 1;
                } else if (lhs.first_name > rhs.first_name) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                if (lhs.last_name < rhs.last_name) {
                    return 1;
                } else if (lhs.last_name > rhs.last_name) {
                    return -1;
                } else {
                    return 0;
                }
            }
        });

        return { result };
    }
}

module.exports.get_students = get_students;