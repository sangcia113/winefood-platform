const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { loginController } = require('../controllers/loginController');
const { authMiddleWare } = require('../middleWares/authMiddleWare');

router.post('/', loginController.handleLogin);

router.post('/verify', authMiddleWare.verifyToken);

module.exports = router;
