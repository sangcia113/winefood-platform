const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    createLeaveTypeHandler,
    readLeaveTypeHandler,
    updateLeaveTypeHandler,
    deleteLeaveTypeHandler,
} = require('../controllers/leaveTypeController');

// End point POST
router.post('/', createLeaveTypeHandler);

// End point GET
router.get('/', readLeaveTypeHandler);

// End point PUT
router.put('/:id', updateLeaveTypeHandler);

// End point DELETE
router.delete('/:id', deleteLeaveTypeHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
