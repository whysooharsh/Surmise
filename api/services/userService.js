const bcrypt = require('bcryptjs');
const User = require('../Models/User');

class UserService {
  async getAllUsers() {
    return await User.find({}, { password: 0 });
  }

  async getUserById(id) {
    const user = await User.findById(id, { password: 0 });
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    return user;
  }

  async createUser({ username, password, email }) {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const error = new Error("Username or email already exists");
      error.status = 400;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      email
    });

    return {
      id: user._id,
      username: user.username,
      email: user.email
    };
  }

  async updateUser({ id, authenticatedUserId, username, email, password }) {
    if (authenticatedUserId !== id) {
      const error = new Error("Not authorized");
      error.status = 403;
      throw error;
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, select: '-password' }
    );

    return updatedUser;
  }

  async deleteUser({ id, authenticatedUserId }) {
    if (authenticatedUserId !== id) {
      const error = new Error("Not authorized");
      error.status = 403;
      throw error;
    }

    await User.findByIdAndDelete(id);
    return { message: "User deleted successfully" };
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    return user;
  }
}

module.exports = new UserService();
