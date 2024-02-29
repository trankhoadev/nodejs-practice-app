const mongoose = require("mongoose");
const Schema = mongoose.Schema;

if (!process.env.DB_MONGOOSE) {
  throw new Error("DB_MONGOOSE environment variable is not defined!");
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
    console.error("Error when connect to Database: , err");
  });

const tokenSchema = new Schema(
  {
    userName: String,
    accessToken: String,
    refreshToken: String,
  },
  { timestamps: true, strict: true }
);

const Token = mongoose.model("tokens", tokenSchema);

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    email: String,
  },
  {
    timestamps: true,
    strict: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = {
  Token,
  User,
};
