// import mongoose
const mongoose = require("mongoose")

// define a schema for all Book documents
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    image: { type: String, required: true },
    haveRead: Boolean,
})


// mount the model using the schema
const Book = mongoose.model("Book", bookSchema) // <- creates the model

// exports the module object - Book
module.exports = Book