const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateBuyer(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.age = !isEmpty(data.age) ? data.age : "";
    data.batchType = !isEmpty(data.batchType) ? data.batchType : "";
    // Name checks
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "Name field is required";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
    }
    // if (!Validator.isInt(data.age), { min: 1, max: 150 }) {
    //     errors.age = "Age must be an integral number between 1 and 150";
    // }
    if (Validator.isEmpty(data.batchType)) {
        errors.batchType = "Batch Type field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};