const Post = require("../models/Post");
const User = require("../models/User");

exports.findAllPosts = async () => {
  return await Post.findAll({ include: User });
};

exports.findPostById = async (id) => {
  return await Post.findByPk(id, {
    include: { model: User, attributes: ["name"] },
  });
};

exports.insertPost = async (post) => {
  return await Post.create(post);
};
