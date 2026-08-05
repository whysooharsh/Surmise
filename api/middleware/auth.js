const jwt = require('jsonwebtoken');
const { getTokenFromRequest } = require('../utils/requestAuth');

function authenticateToken(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

function optionalAuth(req, res, next) {
  const token = getTokenFromRequest(req);
  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    req.user = err ? null : user;
    next();
  });
}

module.exports = {
  authenticateToken,
  optionalAuth
};
