const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { readed } = require('../controllers/loginController');

router.post('/', readed);

module.exports = router;
