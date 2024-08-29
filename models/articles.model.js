const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true
        },
        image: {
            type: String, // Typically a URL or file path
            required: false, // Optional, set to true if required
        }
    },
    createdTime: {
        type: String,
        required: true,
    },
    topics: {
        type: [String], // Array of strings
        required: true,
    },
    visibility: {
        type: String,
        required: true,
        enum: ['private', 'public'], // Optional: restricts to 'private' or 'public'
    }
});

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;
