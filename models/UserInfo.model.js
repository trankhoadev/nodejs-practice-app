const mongoose = require("mongoose");

const userInfoSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    trim: true,
  },

  lastName: {
    type: String,
    require: true,
    trim: true,
  },

  email: {
    type: String,
    require: true,
    trim: true,
  },

  address: {
    type: String,
    require: true,
    trim: true,
  },
});

module.exports = mongoose.model("UserInfo", userInfoSchema);
