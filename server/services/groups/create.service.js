const { add_group } = require("../../resources/db/groups/create.resourse");

const create_group = async ({ title, owner_id }) => {
    // to-do validation

    const { error, result } = await add_group({ title, owner_id });

    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.create_group = create_group;