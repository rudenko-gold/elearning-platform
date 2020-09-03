const { add_course } = require("../../resources/db/courses/create.resource");

const create_course = async ({ title, description, group_id, owner_id }) => {
    // to-do validation

    const { error, result } = await add_course({ title, description, group_id, owner_id });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.create_course = create_course;