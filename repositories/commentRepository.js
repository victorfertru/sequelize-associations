const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

exports.findAllComments = async () => {
  return await Comment.findAll({
    include: [
      { model: User, attributes: ["name"] },
      { model: Post, attributes: ["title"] },
    ],
  });
};

exports.findCommentById = async (id) => {
  return await Comment.findByPk(id, {
    include: [
      { model: User, attributes: ["name"] },
      { model: Post, attributes: ["title"] },
    ],
  });
};

exports.insertComment = async (comment) => {
  return await Comment.create(comment);
};
