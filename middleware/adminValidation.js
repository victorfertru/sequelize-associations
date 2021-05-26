const HttpError = require("../utils/httpError");

const adminValidation = (req, res, next) => {
  // antiguamente se hacía así.  if (req.user && req.user.role !== "user")
  // Hoy día se puede sustituir por esto usando optional chaining
  if (req.user?.role !== "admin") throw new HttpError(401);
  next();
};

module.exports = adminValidation;
