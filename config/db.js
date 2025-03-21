const mongoose = require("mongoose");
require("dotenv").config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Avoid deprecation warnings
      useUnifiedTopology: true, // Ensure stable connection
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDB;
