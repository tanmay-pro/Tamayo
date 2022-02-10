const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateVendor(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.mangFirstName = !isEmpty(data.mangFirstName) ? data.mangFirstName : "";
    data.shopName = !isEmpty(data.shopName) ? data.shopName : "";
    data.contact = !isEmpty(data.contact) ? data.contact : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.canteenOpen = !isEmpty(data.canteenOpen) ? data.canteenOpen : "";
    data.canteenClose = !isEmpty(data.canteenClose) ? data.canteenClose : "";
    // Name checks
    if (Validator.isEmpty(data.mangFirstName)) {
        errors.mangFirstName = "First name field is required";
    }
    if (Validator.isEmpty(data.shopName)) {
        errors.shopName = "Shop name field is required";
    }
    if (Validator.isEmpty(data.contact)) {
        errors.contact = "Contact field is required";
    }
    if (!Validator.isLength(data.contact, { min: 10, max: 10 })) {
        errors.contact = "Contact number should be of 10 digits";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Password must be between 6 and 30 characters";
    }
    if (Validator.isEmpty(data.canteenOpen)) {
        errors.canteenOpen = "Canteen open time is required";
    }
    if (Validator.isEmpty(data.canteenClose)) {
        errors.canteenClose = "Canteen close time is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};