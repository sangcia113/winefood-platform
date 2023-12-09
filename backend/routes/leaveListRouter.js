const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    createLeaveListHandler,
    readLeaveListHandler,
    readLeaveListIsExistedHandler,
} = require('../controllers/leaveListController');

// End point POST
router.post('/', createLeaveListHandler);

// End point GET
router.get('/', readLeaveListHandler);

// End point GET
router.get('/check-existed', readLeaveListIsExistedHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
