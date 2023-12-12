const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    readLeaveListHandler,
    createLeaveListHandler,
} = require('../controllers/leaveListController');

const { checkleaveListExistedMiddleWare } = require('../middleWares/leaveListMiddleWare');

// End point POST
router.post('/', checkleaveListExistedMiddleWare, createLeaveListHandler);

// End point GET
router.get('/', readLeaveListHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
