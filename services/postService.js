const postRepository = require("../repositories/postRepository");
const HttpError = require("../utils/httpError");
const ERRORS = require("../utils/errorMessages");

exports.getPost = async (id) => {
  const post = await postRepository.findPostById(id);
  return post.toJSON();
};

exports.getAllPosts = async () => {
  return await postRepository.findAllPosts();
};

exports.createPost = async (post) => {
  if (!post.title || !post.content) {
    throw new HttpError(400, ERRORS.NO_POST_DATA_PROVIDED);
  }
  await postRepository.insertPost(post);
};

exports.editPost = async (id, postDetails) => {
  await postRepository.updatePost(id, postDetails);
};

exports.removePost = async (id) => {
  await postRepository.deletePost(id);
};
