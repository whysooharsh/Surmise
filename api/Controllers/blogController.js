const fs = require('fs');
const path = require('path');
const Post = require('../Models/Post');
const jwt = require('jsonwebtoken');
const { getTokenFromRequest } = require('../utils/requestAuth');

function verifyToken(req) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

function processUploadedFile(file) {
  if (!file) return null;
  const { originalname, path: filePath } = file;
  const ext = originalname.split('.').pop();
  const filename = `${filePath}.${ext}`;
  fs.renameSync(filePath, filename);
  return filename.replace(/\\/g, '/');
}

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      if (page) {
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const total = await Post.countDocuments();
        const posts = await Post.find()
          .populate('author', ['username'])
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);

        return res.json({
          posts,
          total,
          page,
          pages: Math.ceil(total / limit)
        });
      }
      const posts = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 });

      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts" });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('author', ['username']);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Error fetching post" });
    }
  },

  createPost: async (req, res) => {
    const { title, summary, content } = req.body;

    if (!title || !summary || !content) {
      return res.status(400).json({ message: "Title, summary, and content are required" });
    }

    const userInfo = verifyToken(req);
    if (!userInfo) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const newPath = processUploadedFile(req.file);

    try {
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: userInfo.id,
      });
      res.json(postDoc);
    } catch (error) {
      res.status(500).json({ message: "Error creating post", error: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const userInfo = verifyToken(req);
      if (!userInfo) return res.status(401).json({ message: "Not authenticated" });

      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      if (String(post.author) !== String(userInfo.id)) {
        return res.status(400).json({ message: "You are not the author" });
      }

      let newPath = post.cover;
      if (req.file) {
        newPath = processUploadedFile(req.file);
      }

      const { title, summary, content } = req.body;
      await Post.findByIdAndUpdate(req.params.id, {
        title,
        summary,
        content,
        cover: newPath
      });

      res.json({ message: "Post updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating post" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const userInfo = verifyToken(req);
      if (!userInfo) return res.status(401).json({ message: "Not authenticated" });

      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });

      if (String(post.author) !== String(userInfo.id)) {
        return res.status(400).json({ message: "You are not the author" });
      }

      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  }
};
