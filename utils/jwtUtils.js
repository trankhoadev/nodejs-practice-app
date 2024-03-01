const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const expiredTime = process.env.EXPIRE_TIME;

const generateToken = (user) => {
  return jwt.sign(
    {
      data: user,
    },
    JWT_SECRET,
    {
      expiresIn: expiredTime,
      algorithm: "HS256",
    }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
