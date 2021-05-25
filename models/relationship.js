const dbConnection = require("../config/db");
const User = require("./User");
const Post = require("./Post");

const loadModels = () => {
  User.hasMany(Post, {
    foreignKey: {
      allowNull: false,
    },
  });
  Post.belongsTo(User);

  dbConnection.sync().then(() => console.log("All models loaded"));
};

module.exports = loadModels;
