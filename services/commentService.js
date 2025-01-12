const commentRepository = require("../repositories/commentRepository");
const ERRORS = require("../utils/errorMessages");

exports.getAllPosts = async () => {
  return await commentRepository.findAllComments();
};

exports.getComment = async (id) => {
  const comment = await commentRepository.findCommentById(id);
  return comment.toJSON();
};

exports.createComment = async (comment) => {
  if (!comment.comment) {
    throw new HttpError(400, ERRORS.NO_COMMENT_PROVIDED);
  }
  await commentRepository.insertComment(comment);
};

exports.removeComment = async (id, userId) => {
  await commentRepository.deleteComment(id, userId);
};
