const multer = require('multer');
const fs = require('fs');
const Post = require('../Models/Post');
const jwt = require('jsonwebtoken');

const uploadMiddleware = multer({ 
  dest: "uploads/",
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB for text fields
    fileSize: 5 * 1024 * 1024    // 5MB for file uploads
  }
});

module.exports = {
    getAllPosts: async (req, res) => {
        try {
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
        
        let token = req.cookies.token;
        
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        
        console.log('Create post request - Token exists:', !!token);
        console.log('Create post request - Origin:', req.get('Origin'));
        
        if (!token) {
            console.log('No token found in cookies or Authorization header');
            return res.status(401).json({ message: "Not authenticated" });
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
            if (err) {
                console.log('Token verification error:', err.message);
                return res.status(401).json({ message: "Invalid token" });
            }

            let newPath = null;
            if (req.file) {
                const { originalname, path } = req.file;
                const ext = originalname.split('.').pop();
                const filename = `${path}.${ext}`;
                fs.renameSync(path, filename);
                
                newPath = filename.replace(/\\/g, '/');
            }

            try {
                const postDoc = await Post.create({
                    title,
                    summary,
                    content,
                    cover: newPath,
                    author: info.id,
                });
                res.json(postDoc);
            } catch (error) {
                console.error('Error creating post:', error);
                res.status(500).json({ message: "Error creating post", error: error.message });
            }
        });
    },

    updatePost: async (req, res) => {
        try {
            // Check for token in cookies first, then Authorization header
            let token = req.cookies.token;
            
            if (!token) {
                const authHeader = req.headers.authorization;
                if (authHeader && authHeader.startsWith('Bearer ')) {
                    token = authHeader.substring(7);
                }
            }
            
            if (!token) return res.status(401).json({ message: "Not authenticated" });

            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
                if (err) return res.status(401).json({ message: "Invalid token" });

                const post = await Post.findById(req.params.id);
                if (!post) return res.status(404).json({ message: "Post not found" });
                
                const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id);
                if (!isAuthor) return res.status(400).json({ message: "You are not the author" });

                let newPath = post.cover;
                if (req.file) {
                    const { originalname, path } = req.file;
                    const ext = originalname.split('.').pop();
                    const filename = `${path}.${ext}`;
                    fs.renameSync(path, filename);
                    
                    newPath = filename.replace(/\\/g, '/');
                }

                const { title, summary, content } = req.body;
                await Post.findByIdAndUpdate(req.params.id, {
                    title,
                    summary,
                    content,
                    cover: newPath
                });

                res.json({ message: "Post updated successfully" });
            });
        } catch (error) {
            res.status(500).json({ message: "Error updating post" });
        }
    },

    deletePost: async (req, res) => {
        try {
            // Check for token in cookies first, then Authorization header
            let token = req.cookies.token;
            
            if (!token) {
                const authHeader = req.headers.authorization;
                if (authHeader && authHeader.startsWith('Bearer ')) {
                    token = authHeader.substring(7);
                }
            }
            
            if (!token) return res.status(401).json({ message: "Not authenticated" });

            jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
                if (err) return res.status(401).json({ message: "Invalid token" });

                const post = await Post.findById(req.params.id);
                if (!post) return res.status(404).json({ message: "Post not found" });

                const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id);
                if (!isAuthor) return res.status(400).json({ message: "You are not the author" });

                await Post.findByIdAndDelete(req.params.id);
                res.json({ message: "Post deleted successfully" });
            });
        } catch (error) {
            res.status(500).json({ message: "Error deleting post" });
        }
    }
};
