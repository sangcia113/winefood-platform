const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { leaveTypeController } = require('../controllers/leaveTypeController');
const { leaveTypeMiddleWare } = require('../middleWares/leaveTypeMiddleWare');

// End point POST
router.post('/', leaveTypeMiddleWare.checkBody, leaveTypeController.create);

// End point GET
router.get('/', leaveTypeController.read);

// End point PUT
router.put(
    '/:id',
    leaveTypeMiddleWare.checkBody,
    leaveTypeMiddleWare.checkParam,
    leaveTypeController.update
);

// End point DELETE
router.delete('/:id', leaveTypeMiddleWare.checkParam, leaveTypeController.delete);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
