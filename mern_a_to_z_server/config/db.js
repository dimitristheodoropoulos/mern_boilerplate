const mongoose = require('mongoose');
require('dotenv').config(); // Import dotenv to load variables from .env

mongoose.set('strictQuery', false); // Or use true if you prefer strict query behavior

// Use the environment variable MONGODB_URI or fall back to localhost if not set
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myDatabase';

const connectDB = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected locally'))
    .catch((err) => console.log('MongoDB connection error:', err));
};

module.exports = connectDB; // Export the function
