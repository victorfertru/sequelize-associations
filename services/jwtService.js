const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const validateToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { generateToken, validateToken };
