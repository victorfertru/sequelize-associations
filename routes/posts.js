const express = require("express");
const roleValidation = require("../middleware/roleValidation");
const userValidation = require("../middleware/userValidation");
const router = express.Router();
const postService = require("../services/postService");

//incluimos el middleware para que valide que es un usuario registrado
// si usamos validación de rol con arrays => roleValidation(["user", "mods"])
router.get("/all", roleValidation("user"), async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", roleValidation(["user", "mods"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getPost(id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    await postService.createPost(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await postService.editPost(id, req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await postService.removePost(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
