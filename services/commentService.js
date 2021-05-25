const commentRepository = require("../repositories/commentRepository");

exports.getAllPosts = async () => {
  return await commentRepository.findAllComments();
};

exports.createComment = async (comment) => {
  if (!comment.content) {
    throw new Error("You must provide content to comment");
  }
  await commentRepository.insertComment(comment);
};
