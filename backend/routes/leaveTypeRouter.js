const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { leaveTypeController } = require('../controllers/leaveTypeController');
const { leaveTypeMiddleWare } = require('../middleWares/leaveTypeMiddleWare');

// End point POST
router.post('/', leaveTypeMiddleWare.checkBody, leaveTypeController.createHandler);

// End point GET
router.get('/', leaveTypeController.readHandler);

// End point PUT
router.put(
    '/:id',
    leaveTypeMiddleWare.checkBody,
    leaveTypeMiddleWare.checkParam,
    leaveTypeController.updateHandler
);

// End point DELETE
router.delete('/:id', leaveTypeMiddleWare.checkParam, leaveTypeController.deleteHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
