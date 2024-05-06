const {Schema, model } = require("mongoose");

const ProductSchema= Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "default.png"
    }
});

module.exports = model("Product", ProductSchema,"products")