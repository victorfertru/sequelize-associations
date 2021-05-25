const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const User = dbConnection.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    defaultScope: { attributes: { exclude: ["password"] } },
    scopes: { withPassword: { attributes: {} } },
  }
);

User.prototype.toJSON = function () {
  const attributes = Object.assign({}, this.get());
  delete attributes.password;
  return attributes;
};

module.exports = User;
