const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    createLeaveListHandler,
    readLeaveListHandler,
} = require('../controllers/leaveListController');

// End point POST
router.post('/', createLeaveListHandler);

// End point GET
router.get('/', readLeaveListHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
