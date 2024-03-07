const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { readed, readedFollower } = require('../controllers/zaloAPIController');

// End point GET
router.get('/user', readed);

// End point GET
router.get('/get-follower', readedFollower);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
