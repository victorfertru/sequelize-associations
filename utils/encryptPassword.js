const crypto = require("crypto");
const { promisify } = require("util");

const asyncScrypt = promisify(crypto.scrypt);

const encryptPassword = async (password) => {
  const encryptedPassword = await asyncScrypt(password, process.env.SALT, 32);
  return encryptedPassword.toString("hex");
};

module.exports = encryptPassword;
