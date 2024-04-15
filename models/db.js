const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/blogdata'; 

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
