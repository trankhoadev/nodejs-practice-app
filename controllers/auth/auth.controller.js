const User = require("../../models/User.model");
const jwtUtils = require("../../utils/jwtUtils");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
const expiredTime = process.env.EXPIRE_TIME;

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password!",
      });
    }

    const token = await jwtUtils.generateToken(user, JWT_SECRET, expiredTime);

    res.json({ token });
  } catch (err) {
    console.error("Internal Server Error: ", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const postCreateAccount = async (req, res) => {
  const { username, password } = req.body;

  try {
    const isExistingUser = await User.findOne({ username });

    if (isExistingUser) {
      return res.status(400).json({
        message: "Username already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();

    const token = await jwtUtils.generateToken(newUser, JWT_SECRET, expiredTime);

    res.status(201).json({ token });
  } catch (err) {
    console.error("Internal Server Error: ", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  postLogin,
  postCreateAccount,
};
