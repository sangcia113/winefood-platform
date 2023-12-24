const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { leaveListController } = require('../controllers/leaveListController');

const { leaveListMiddleWare } = require('../middleWares/leaveListMiddleWare');

// End point POST
router.post('/', leaveListMiddleWare.checkBody, leaveListController.createHandler);

// End point GET
router.get('/', leaveListController.readHandler);

// End point GET
router.get('/search', leaveListMiddleWare.checkDate, leaveListController.readByDateHandler);

// End point GET
router.get('/other', leaveListController.readOtherHandler);

// End point GET
router.get(
    '/other/search',
    leaveListMiddleWare.checkDate,
    leaveListController.readOtherByDateHandler
);

// End point GET
router.get('/statistics', leaveListController.readStatisticsHandler);

// End point GET
router.get(
    '/statistics/search',
    leaveListMiddleWare.checkDate,
    leaveListController.readStatisticsByDateHandler
);

// End point PUT
router.put(
    '/approved/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkBody,
    leaveListMiddleWare.checkApproved,
    leaveListController.updateApprovedHandler
);

// End point PUT
router.put(
    '/rejected/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkRejected,
    leaveListController.updateRejectedHandler
);

// End point PUT
router.put(
    '/approved-leave-type/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkApprovedLeaveType,
    leaveListController.updateApprovedLeaveTypeHandler
);

// End point PUT
router.put(
    '/approved-leave-day/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkApprovedLeaveDay,
    leaveListController.updateApprovedLeaveDayHandler
);

// End point PUT
router.put(
    '/approved-request-delete/:id',
    leaveListMiddleWare.checkParam,
    leaveListMiddleWare.checkApprovedRequestDelete,
    leaveListController.updateApprovedRequestDeleteHandler
);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
