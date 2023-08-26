const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    category: {
        type: String,
    },
    author:
    {
        type: String,
    },
    book:
    {
        type: String,
    },
},

);
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

