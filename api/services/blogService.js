const Post = require('../Models/Post');

class BlogService {
  async getAllPosts({ page, limit = 5 }) {
    if (page) {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10) || 5;
      const skip = (pageNum - 1) * limitNum;
      
      const total = await Post.countDocuments();
      const posts = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

      return {
        posts,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum)
      };
    }

    return await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 });
  }

  async getPostById(id) {
    const post = await Post.findById(id).populate('author', ['username']);
    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error;
    }
    return post;
  }

  async createPost({ title, summary, content, cover, authorId }) {
    if (!title || !summary || !content) {
      const error = new Error("Title, summary, and content are required");
      error.status = 400;
      throw error;
    }

    return await Post.create({
      title,
      summary,
      content,
      cover,
      author: authorId
    });
  }

  async updatePost({ id, title, summary, content, cover, authorId }) {
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error;
    }

    if (String(post.author) !== String(authorId)) {
      const error = new Error("You are not the author");
      error.status = 400;
      throw error;
    }

    const newCover = cover !== undefined ? cover : post.cover;

    await Post.findByIdAndUpdate(id, {
      title,
      summary,
      content,
      cover: newCover
    });

    return { message: "Post updated successfully" };
  }

  async deletePost({ id, authorId }) {
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error;
    }

    if (String(post.author) !== String(authorId)) {
      const error = new Error("You are not the author");
      error.status = 400;
      throw error;
    }

    await Post.findByIdAndDelete(id);
    return { message: "Post deleted successfully" };
  }
}

module.exports = new BlogService();
