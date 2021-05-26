const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const HttpError = require("../utils/httpError");
const ERRORS = require("../utils/errorMessages");

exports.findAllPosts = async () => {
  return await Post.findAll({
    include: [
      { model: User, attributes: ["name"] },
      {
        model: Comment,
        attributes: ["id", "comment"],
        include: { model: User, attributes: ["name"] },
      },
    ],
  });
};

exports.findPostById = async (id) => {
  return await Post.findByPk(id, {
    include: [
      { model: User, attributes: ["name"] },
      {
        model: Comment,
        attributes: ["id", "comment"],
        include: { model: User, attributes: ["name"] },
      },
    ],
  });
};

exports.insertPost = async (post) => {
  return await Post.create(post);
};

exports.updatePost = async (id, postDetails) => {
  const postId = await Post.findOne({ where: { id } });
  if (!postId) {
    throw new HttpError(400, ERRORS.NONE_POST_ID + id);
  }
  delete postDetails.id;

  return await Post.update(postDetails, { where: { id } });
};

exports.deletePost = async (id) => {
  const postId = await Post.findOne({ where: { id } });
  if (!postId) {
    throw new HttpError(400, ERRORS.NONE_POST_ID + id);
  }
  return await Post.destroy({ where: { id } });
};
