const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    getFollower,
    readed,
    requestUserInfo,
    getProfile,
} = require('../controllers/zaloAPIController');

// End point GET
router.get('/user', readed);

// End point GET
router.get('/get-follower', getFollower);

// End point GET
router.get('/get-profile/:id', getProfile);

// End point POST
router.post('/request-user-info/:id', requestUserInfo);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
