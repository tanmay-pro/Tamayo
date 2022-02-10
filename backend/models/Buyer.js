const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    age: {
        type: Number,
        required: true
    },
    batchType: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: "buyer"
    },
    favName: {
        type: [String],
        default: []
    },
    favEmail: {
        type: [String],
        default: []
    },
    wallet: {
        type: Number,
        default: 0
    }
});

module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);