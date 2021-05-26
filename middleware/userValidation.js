const HttpError = require("../utils/httpError");

const userValidation = (req, res, next) => {
  // antiguamente se hacía así.  if (req.user && req.user.role !== "user")
  // Hoy día se puede sustituir por esto usando optional chaining

  // Si no es usuario, ni admin, mostrar error
  // forma antigua:  if (req.user?.role !== "user" || req.user?.role !== "admin")
  if (!["user", "admin"].includes(req.user?.role)) throw new HttpError(401);

  next();
};

module.exports = userValidation;
