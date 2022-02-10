const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
    mangFirstName: {
        type: String,
        required: true
    },
    mangLastName: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    canteenOpen: {
        type: String,
        required: true
    },
    canteenClose: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: 'vendor'
    }
});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);