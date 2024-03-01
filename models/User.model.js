const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      minlength: 5,
      maxlength: 20,
      trim: true,
    },

    password: {
      type: String,
      require: true,
      minlength: 6,
    },
  },
  { timestamps: true, strict: true }
);

userSchema.pre("save", async (next) => {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async (candidatePassword) => {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    return false;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
