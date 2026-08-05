const authService = require('../services/authService');
const { getTokenFromRequest } = require('../utils/requestAuth');

module.exports = {
  login: async (req, res) => {
    try {
      const result = await authService.login(req.body);
      res.cookie('token', result.token, result.cookieOptions);
      res.json(result.user);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message || "Internal server error" });
    }
  },

  register: async (req, res) => {
    try {
      const userDoc = await authService.register(req.body);
      res.json(userDoc);
    } catch (err) {
      res.status(err.status || 400).json(err.message ? { message: err.message } : err);
    }
  },

  profile: (req, res) => {
    try {
      const token = getTokenFromRequest(req);
      const info = authService.verifyToken(token);
      res.json(info);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message || "Error checking profile" });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { token } = req.cookies;
      const info = authService.verifyToken(token);
      res.json(info);
    } catch (err) {
      res.status(err.status || 401).json({ message: err.message });
    }
  },

  logout: (req, res) => {
    const cookieOptions = authService.getLogoutCookieOptions();
    res.cookie('token', '', cookieOptions).json('ok');
  }
};
