const bcrypt = require("bcrypt");
const { add_teacher, add_student } = require("../../../resources/db/users/auth/register.resource");
const { register_validation } = require("../../validation/user_validation");

const register_teacher = async ({ first_name, last_name, email, password }) => {
    // Data validation
    const { validation_error } = register_validation({ first_name, last_name, email, password });

    if (validation_error) {
        // Bad request response
        return { validation_error };
    } 
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);   
    const { error, result } = await add_teacher({ first_name, last_name, email, password: hashed_password });

    if (error) {
        return { error };
    } else {
        return { result };
    }
};

const register_student = async ({ first_name, last_name, email, password }) => {
    // Data validation
    const { validation_error } = register_validation({ first_name, last_name, email, password });

    if (validation_error) {
        // Bad request response
        return { validation_error };
    } 

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);    

    const { error, result } = await add_student({ first_name, last_name, email, password: hashed_password });

    if (error) {
        return { error };
    } else {
        return { result };
    }
};

module.exports.register_teacher = register_teacher;
module.exports.register_student = register_student;