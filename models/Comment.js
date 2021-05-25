const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Comment = dbConnection.define("Comment", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
  },
});

module.exports = Comment;
