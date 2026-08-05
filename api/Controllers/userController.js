const userService = require('../services/userService');
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
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error fetching users" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error fetching user" });
    }
  },

  createUser: async (req, res) => {
    try {
      const result = await userService.createUser(req.body);
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error creating user" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userInfo = getAuthenticatedUser(req);
      if (!userInfo) return res.status(401).json({ message: "Not authenticated" });

      const updatedUser = await userService.updateUser({
        id: req.params.id,
        authenticatedUserId: userInfo.id,
        ...req.body
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error updating user" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userInfo = getAuthenticatedUser(req);
      if (!userInfo) return res.status(401).json({ message: "Not authenticated" });

      const result = await userService.deleteUser({
        id: req.params.id,
        authenticatedUserId: userInfo.id
      });

      res.clearCookie('token');
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error deleting user" });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      const userInfo = getAuthenticatedUser(req);
      if (!userInfo) return res.status(401).json({ message: "Not authenticated" });

      const user = await userService.getUserProfile(userInfo.id);
      res.json(user);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Error fetching profile" });
    }
  }
};
