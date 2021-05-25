const { createPool } = require("mysql2/promise");
const commentRepository = require("../repositories/commentRepository");

exports.getAllPosts = async () => {
  return await commentRepository.findAllComments();
};

exports.getComment = async (id) => {
  const comment = await commentRepository.findCommentById(id);
  return comment.toJSON();
};

exports.createComment = async (comment) => {
  if (!comment.content) {
    throw new Error("You must provide content to comment");
  }
  await commentRepository.insertComment(comment);
};
