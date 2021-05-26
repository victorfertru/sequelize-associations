const express = require("express");
const router = express.Router();
const commentService = require("../services/commentService");
const roleValidation = require("../middleware/roleValidation");

router.get("/all", roleValidation("mod"), async (_, res) => {
  try {
    const comments = await commentService.getAllPosts();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", roleValidation("mod"), async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentService.getComment(id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", roleValidation(["user", "mod"]), async (req, res) => {
  try {
    await commentService.createComment(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", roleValidation(["user", "mod"]), async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    await commentService.removeComment(id, userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
