const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const expiredTime = process.env.EXPIRE_TIME;

const generateToken = (userData, secretKey = JWT_SECRET, tokenLife = expiredTime) => {
  return new Promise((resolve, reject) => {
    if (!userData || typeof userData !== "object") {
      return reject(new Error("Invalid user data"));
    }

    jwt.sign(
      { data: userData },
      secretKey,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (err, token) => {
        if (err) {
          return reject(new Error("Token signing failed: ", err));
        }

        return resolve(token);
      }
    );
  });
};

const verifyToken = (token, secretKey = JWT_SECRET) => {
  return new Promise((resolve, reject) => {
    if (!token || typeof token !== "string") {
      return reject(new Error("Invalid token"));
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(new Error("Token verification failed: ", err));
      }

      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
