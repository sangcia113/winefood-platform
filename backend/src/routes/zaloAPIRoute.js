const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { readed, sendZaloAPIV3 } = require('../controllers/zaloAPIController');

const { checkMessage } = require('../middleWares/zaloAPIMiddleWare');

// End point GET
router.get('/user', readed);

// End point POST
router.post('/send', checkMessage, sendZaloAPIV3);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
