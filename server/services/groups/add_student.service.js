const { add_student_to_group } = require("../../resources/db/groups/add_student.resource");
const { get_student_by_email } = require("../../resources/db/users/utils/utils.resource");

const add_student = async ({ student_email, teacher_id, group_id }) => {
    console.log(student_email);
    console.log(teacher_id);
    console.log(group_id);

    const student_id = await get_student_by_email({ email: student_email });

    const { error, result } = await add_student_to_group({ student_id, teacher_id, group_id, })
    
    if (error) {
        return { error };
    } else {
        return { result };
    }
}

module.exports.add_student = add_student;