const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/blogdata'; // Replace with your connection string

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the application on connection error
  }
};

module.exports = connectDB;
