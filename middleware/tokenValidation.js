// decodificar la información del token y setearla en la request

const { validateToken } = require("../services/jwtService");

const tokenValidation = (req, res, next) => {
  if (req.headers.authorization) {
    // hacemos .slice(7) porque en las cabeceras siempre incluye "Bearer TOKENASÑKDFASJFÑKASEFÑKASF)"
    // Y tenemos que eliminar "Bearer "
    const token = req.headers.authorization.slice(7);
    // del token solo cogemos el email y el role
    const { id, email, role } = validateToken(token);
    //a la request le añadimos una nueva propiedad "user" y le añadimos el valor email y role
    req.user = { id, email, role };
  }
  next();
};

module.exports = tokenValidation;
