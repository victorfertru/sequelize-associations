const userRepository = require("../repositories/userRepository");
const encryptPassword = require("../utils/encryptPassword");
const {
  insertUserSchema,
  updateSchema,
} = require("../validations/userValidation");
const { generateToken } = require("./jwtService");
const HttpError = require("../utils/httpError");
const ERRORS = require("../utils/errorMessages");

exports.signup = async (userDetails) => {
  const validation = await insertUserSchema.validateAsync(userDetails);
  validation.password = await encryptPassword(validation.password);

  await userRepository.insertUser(validation);
};

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new HttpError(401, ERRORS.NO_USER_DATA_PROVIDED);
  }

  const user = await userRepository.findUserWithPasswordByEmail(email);

  if (!user) throw new HttpError(401, ERRORS.NO_USER_EXIST);

  const encryptedPassword = await encryptPassword(password);

  if (user.password !== encryptedPassword) {
    throw new HttpError(401, ERRORS.INVALID_PASSWORD);
  }

  const token = generateToken(user.id, user.email, user.role);

  return token;
};

exports.getProfile = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  return user.toJSON();
};

exports.getAllProfiles = async () => {
  return await userRepository.findAllUsers();
};

exports.editProfile = async (id, userDetails) => {
  const validation = await updateSchema.validateAsync(userDetails);

  if (validation.password) {
    validation.password = await encryptPassword(validation.password);
  }

  await userRepository.updateUser(id, validation);
};

exports.removeUser = async (id) => {
  if (!id) {
    throw new HttpError(400, ERRORS.NO_USER_PROVIDE);
  }
  await userRepository.deleteUser(id);
};
