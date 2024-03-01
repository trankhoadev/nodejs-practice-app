// db.config.js

const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.DB_MONGOOSE) {
    throw new Error("DB_MONGOOSE environment file haven't config yet!");
  }

  try {
    await mongoose.connect(process.env.DB_MONGOOSE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to mongoose successfully!");
  } catch (err) {
    console.error("Have error when connect to mongoose: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
