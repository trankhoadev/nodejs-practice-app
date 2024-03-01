const User = require("../../models/User.model");
const jwtUtils = require("../../utils/jwtUtils");
const bcrypt = require("bcrypt");

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password!",
      });
    }
    console.log(password, user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password!",
      });
    }

    const token = jwtUtils.generateToken(user);

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
    console.log(isExistingUser);

    if (isExistingUser) {
      return res.status(400).json({
        message: "Username already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();

    const token = jwtUtils.generateToken(newUser);

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
