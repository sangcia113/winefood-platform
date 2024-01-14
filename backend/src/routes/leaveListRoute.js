const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    created,
    readed,
    readedByDate,
    readedOther,
    readedOtherByDate,
    readedStatistics,
    readedStatisticsByDate,
    readedHistory,
    readedLeader,
    updatedApproved,
    updatedApprovedLeaveDay,
    updatedApprovedLeaveType,
    updatedApprovedRequestDelete,
    updatedRejected,
    updateCancel,
    updateRequestCancel,
} = require('../controllers/leaveListController');

const {
    checkApproved,
    checkApprovedLeaveDay,
    checkApprovedLeaveType,
    checkApprovedRequestDelete,
    checkBody,
    checkDate,
    checkIsExist,
    checkParam,
    checkRejected,
} = require('../middleWares/leaveListMiddleWare');

// End point POST
router.post('/', checkBody, checkIsExist, created);

// End point GET
router.get('/', readed);

// End point GET
router.get('/history', readedHistory);

// End point GET
router.get('/leader', readedLeader);

// End point GET
router.get('/search', checkDate, readedByDate);

// End point GET
router.get('/other', readedOther);

// End point GET
router.get('/other/search', checkDate, readedOtherByDate);

// End point GET
router.get('/statistics', readedStatistics);

// End point GET
router.get('/statistics/search', checkDate, readedStatisticsByDate);

// End point PUT
router.put('/approved/:id', checkParam, checkBody, checkApproved, updatedApproved);

// End point PUT
router.put('/rejected/:id', checkParam, checkRejected, updatedRejected);

// End point PUT
router.put(
    '/approved-leave-type/:id',
    checkParam,
    checkApprovedLeaveType,
    updatedApprovedLeaveType
);

// End point PUT
router.put('/approved-leave-day/:id', checkParam, checkApprovedLeaveDay, updatedApprovedLeaveDay);

// End point PUT
router.put(
    '/approved-request-delete/:id',
    checkParam,
    checkApprovedRequestDelete,
    updatedApprovedRequestDelete
);

// End point PUT
router.put('/cancel/:id', checkParam, updateCancel);

// End point PUT
router.put('/request-cancel/:id', checkParam, updateRequestCancel);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
