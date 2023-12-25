const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { leaveListController } = require('../controllers/leaveListController');

const { leaveListMiddleWare } = require('../middleWares/leaveListMiddleWare');

// End point POST
router.post('/', leaveListMiddleWare.checkBody, leaveListController.create);

// End point GET
router.get('/', leaveListController.read);

// End point GET
router.get('/search', leaveListMiddleWare.checkDate, leaveListController.readByDate);

// End point GET
router.get('/other', leaveListController.readOther);

// End point GET
router.get('/other/search', leaveListMiddleWare.checkDate, leaveListController.readOtherByDate);

// End point GET
router.get('/statistics', leaveListController.readStatistics);

// End point GET
router.get(
    '/statistics/search',
    leaveListMiddleWare.checkDate,
    leaveListController.readStatisticsByDate
);

// End point PUT
router.put(
    '/approved/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkBody,
    leaveListMiddleWare.checkApproved,
    leaveListController.updateApproved
);

// End point PUT
router.put(
    '/rejected/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkRejected,
    leaveListController.updateRejected
);

// End point PUT
router.put(
    '/approved-leave-type/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkApprovedLeaveType,
    leaveListController.updateApprovedLeaveType
);

// End point PUT
router.put(
    '/approved-leave-day/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkApprovedLeaveDay,
    leaveListController.updateApprovedLeaveDay
);

// End point PUT
router.put(
    '/approved-request-delete/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkApprovedRequestDelete,
    leaveListController.updateApprovedRequestDelete
);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
