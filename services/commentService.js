const commentRepository = require("../repositories/commentRepository");

exports.getAllPosts = async () => {
  return await commentRepository.findAllComments();
};

exports.getComment = async (id) => {
  const comment = await commentRepository.findCommentById(id);
  return comment.toJSON();
};

exports.createComment = async (comment) => {
  if (!comment.comment) {
    throw new Error("You must provide content to comment");
  }
  await commentRepository.insertComment(comment);
};

exports.removeComment = async (id) => {
  await commentRepository.deleteComment(id);
};
