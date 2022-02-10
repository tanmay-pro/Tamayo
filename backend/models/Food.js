const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");

// Create Schema
const FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: -1
    },
    type: {
        type: String,
        required: true
    },
    addOnName: {
        type: [String],
        default: []
    },
    addOnPrice: {
        type: [Number],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    image: {
        data: Buffer,
        default: "https://png.pngtree.com/element_our/20200702/ourmid/pngtree-vector-illustration-knife-and-fork-western-food-plate-image_2283844.jpg",
        type: String
    },
    vendor_email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
});
FoodSchema.plugin(mongoose_fuzzy_searching, { fields: ["name"] });
module.exports = Food = mongoose.model("Food", FoodSchema);