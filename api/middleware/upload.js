const multer = require('multer');

const uploadMiddleware = multer({
  dest: 'uploads/',
  limits: {
    fieldSize: 10 * 1024 * 1024,
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = uploadMiddleware;
