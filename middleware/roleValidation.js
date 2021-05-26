const HttpError = require("../utils/httpError");

// función de primer orden. Función que invoca otra función.
// Le pasamos un role y nos crea una validación para ese role que estamos pasando
const roleValidation = (role) => {
  // comprobamos si es un sólo rol, o si son varios. Si es un array, lo dejamos como viene
  // si no es un array, lo convertimos (para que no haya errores en la destructuración posterior)
  const roles = Array.isArray(role) ? role : [role];
  return (req, res, next) => {
    if (![...roles, "admin"].includes(req.user?.role)) throw new HttpError(401);
    next();
  };
};
module.exports = roleValidation;
