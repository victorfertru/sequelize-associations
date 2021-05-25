const Comment = require("../models/Comment");
const User = require("../models/User");

exports.findAllComments = async () => {
  return await Comment.findAll({
    include: { model: User, attributes: ["name"] },
  });
};

exports.insertComment = async (comment) => {
  return await Comment.create(comment);
};