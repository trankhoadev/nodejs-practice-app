const mongoose = require("mongoose");
const Schema = mongoose.Schema;

if (!process.env.DB_MONGOOSE) {
  throw new Error("DB_MONGOOSE environment still not setup yet!");
}

mongoose
  .connect(process.env.DB_MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to Mongoose successfully!");
  })
  .catch((err) => {
    console.error("Error when connect to Mongoose: ", err);
  });
