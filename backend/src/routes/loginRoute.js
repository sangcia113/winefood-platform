const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { loginController } = require('../controllers/loginController');

router.post('/', loginController.handleLogin);

module.exports = router;
