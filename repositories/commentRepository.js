const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const ERRORS = require("../utils/errorMessages");

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

exports.deleteComment = async (id, userId) => {
  const commentId = await Comment.findByPk(id);
  if (!commentId) {
    throw new HttpError(400, ERRORS.NO_COMMENT_EXISTS + id);
  }
  return await Comment.destroy({ where: { id, UserId: userId } });
};
