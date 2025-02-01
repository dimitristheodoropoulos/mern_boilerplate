const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  published_date: {
    type: Date,
  },
  publisher: {
    type: String,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    enum: ['fiction', 'non-fiction', 'science fiction', 'fantasy', 'biography', 'history', 'mystery'], // Adjust the categories as needed
  },
});

module.exports = Book = mongoose.model('book', BookSchema);
