const User = require("../models/User");
const ERRORS = require("../utils/errorMessages");

exports.findAllUsers = async () => {
  return await User.findAll();
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

exports.findUserWithPasswordByEmail = async (email) => {
  return await User.scope("withPassword").findOne({ where: { email } });
};

exports.insertUser = async (user) => {
  return await User.create(user);
};

exports.updateUser = async (id, userDetails) => {
  const userId = await User.findOne({ where: { id } });
  if (!userId) {
    throw new HttpError(400, ERRORS.NO_USER_EXIST);
  }
  return await User.update(userDetails, { where: { id } });
};

exports.deleteUser = async (id) => {
  const userId = await User.findOne({ where: { id } });
  if (!userId) {
    throw new HttpError(400, ERRORS.NO_USER_EXIST);
  }
  return await User.destroy({ where: { id } });
};
