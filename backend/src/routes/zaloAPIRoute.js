const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { readed, readedUser, updated } = require('../controllers/zaloAPIController');
const { checkUpdate } = require('../middleWares/zaloAPIMiddleWare');

// End point GET
router.get('/token', readed);

// End point GET
router.get('/user', readedUser);

// End point PUT
router.put('/token', checkUpdate, updated);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
