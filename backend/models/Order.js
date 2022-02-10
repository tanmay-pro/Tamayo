const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
    placed_time: {
        type: String,
        required: true
    },
    food_item: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    vendor_email: {
        type: String,
        required: true
    },
    buyer_email: {
        type: String,
        required: true
    },
    net_cost: {
        type: Number,
        default: 0
    },
    addOnNames: {
        type: [String],
        default: []
    },
    rating: {
        type: Number,
        default: -1
    },
    batch: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: -1
    },
    rating_status: {
        type: Number,
        default: -1
    }
});

module.exports = Order = mongoose.model("Order", OrderSchema);