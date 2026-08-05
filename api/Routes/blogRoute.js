const { Router } = require("express");
const router = Router();

const blogController = require('../Controllers/blogController');
const uploadMiddleware = require('../middleware/upload');
const { authenticateToken } = require('../middleware/auth');

router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPostById);
router.post('/', authenticateToken, uploadMiddleware.single('file'), blogController.createPost);
router.put('/:id', authenticateToken, uploadMiddleware.single('file'), blogController.updatePost);
router.delete('/:id', authenticateToken, blogController.deletePost);

module.exports = router;
