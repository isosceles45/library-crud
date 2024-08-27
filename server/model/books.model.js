const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
});

module.exports = mongoose.model("Book", bookSchema);
