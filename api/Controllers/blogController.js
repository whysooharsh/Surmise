const blogService = require('../services/blogService');
const { processUploadedFile } = require('../utils/fileHelper');
const { getTokenFromRequest } = require('../utils/requestAuth');
const jwt = require('jsonwebtoken');

function getAuthenticatedUser(req) {
  if (req.user) return req.user;
  const token = getTokenFromRequest(req);
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const result = await blogService.getAllPosts({ page, limit });
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error fetching posts" });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await blogService.getPostById(req.params.id);
      res.json(post);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error fetching post" });
    }
  },

  createPost: async (req, res) => {
    const userInfo = getAuthenticatedUser(req);
    if (!userInfo) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { title, summary, content } = req.body;
    const coverPath = processUploadedFile(req.file);

    try {
      const postDoc = await blogService.createPost({
        title,
        summary,
        content,
        cover: coverPath,
        authorId: userInfo.id
      });
      res.json(postDoc);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error creating post" });
    }
  },

  updatePost: async (req, res) => {
    try {
      const userInfo = getAuthenticatedUser(req);
      if (!userInfo) return res.status(401).json({ message: "Not authenticated" });

      const { title, summary, content } = req.body;
      const coverPath = req.file ? processUploadedFile(req.file) : undefined;

      const result = await blogService.updatePost({
        id: req.params.id,
        title,
        summary,
        content,
        cover: coverPath,
        authorId: userInfo.id
      });

      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error updating post" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const userInfo = getAuthenticatedUser(req);
      if (!userInfo) return res.status(401).json({ message: "Not authenticated" });

      const result = await blogService.deletePost({
        id: req.params.id,
        authorId: userInfo.id
      });

      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error deleting post" });
    }
  }
};
