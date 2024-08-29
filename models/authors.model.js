const mongoose = require('mongoose');

// Assuming the Article model is already defined and imported
const Article = require('./articles.model'); // Adjust the path according to your project structure

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    topics: {
        type: [String], // Array of strings
        required: false,
    },
    bio: {
        type: String,
        required: false,
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article' // Reference to the Article model
    }],
    image: {
        type: String,
        required: false,
    }
});

const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;
