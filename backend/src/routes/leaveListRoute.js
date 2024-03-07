const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    created,
    readedManager,
    readedManagerByDate,
    readedManagerOther,
    readedManagerOtherByDate,
    readedManagerStatistics,
    readedManagerStatisticsByDate,
    readedHistory,
    readedLeader,
    updatedLeaderApproved,
    updatedLeaderRejected,
    updatedManagerApproved,
    updatedApprovedLeaveDay,
    updatedApprovedLeaveType,
    updatedApprovedRequestDelete,
    updatedManagerRejected,
    updateCancel,
    updateEdit,
    updateRequestCancel,
    updateRequestEdit,
} = require('../controllers/leaveListController');

const {
    memberSendMessageRequestToSuperior,
    memberSendMessageRequestCancelToManager,
    memberSendMessageRequestEditToManager,
    leaderSendMessageApproveToManager,
    leaderSendMessageRejectToMember,
    managerSendMessageApproveToMember,
    managerSendMessageRejectToMember,
    managerSendMessageApproveLeaveTypeToMember,
    managerSendMessageApproveLeaveDayToMember,
    managerSendMessageApproveRequestDeleteToMember,
} = require('../controllers/zaloAPIController');

const {
    checkLeaderApproved,
    checkLeaderRejected,
    checkManagerApproved,
    checkManagerRejected,
    checkApprovedLeaveDay,
    checkApprovedLeaveType,
    checkApprovedRequestDelete,
    checkBody,
    checkDate,
    checkIsExist,
    checkParam,
} = require('../middleWares/leaveListMiddleWare');

// End point POST
router.post('/', checkBody, checkIsExist, created, memberSendMessageRequestToSuperior);

// End point GET
router.get('/history', readedHistory);

// End point GET
router.get('/leader', readedLeader);

// End point GET
router.get('/manager', readedManager);

// End point GET
router.get('/manager/search', checkDate, readedManagerByDate);

// End point GET
router.get('/manager/other', readedManagerOther);

// End point GET
router.get('/manager/other/search', checkDate, readedManagerOtherByDate);

// End point GET
router.get('/manager/statistics', readedManagerStatistics);

// End point GET
router.get('/manager/statistics/search', checkDate, readedManagerStatisticsByDate);

// End point PUT
router.put('/history/cancel/:id', checkParam, updateCancel);

// End point PUT
router.put('/history/edit/:id', checkParam, updateEdit);

// End point PUT
router.put(
    '/history/request-cancel/:id',
    checkParam,
    updateRequestCancel,
    memberSendMessageRequestCancelToManager
);

// End point PUT
router.put(
    '/history/request-edit/:id',
    checkParam,
    updateRequestEdit,
    memberSendMessageRequestEditToManager
);

// End point PUT
router.put(
    '/leader/approved/:id',
    checkParam,
    checkLeaderApproved,
    updatedLeaderApproved,
    leaderSendMessageApproveToManager
);

// End point PUT
router.put(
    '/leader/rejected/:id',
    checkParam,
    checkLeaderRejected,
    updatedLeaderRejected,
    leaderSendMessageRejectToMember
);

// End point PUT
router.put(
    '/manager/approved/:id',
    checkParam,
    checkManagerApproved,
    updatedManagerApproved,
    managerSendMessageApproveToMember
);

// End point PUT
router.put(
    '/manager/rejected/:id',
    checkParam,
    checkManagerRejected,
    updatedManagerRejected,
    managerSendMessageRejectToMember
);

// End point PUT
router.put(
    '/manager/approved-leave-type/:id',
    checkParam,
    checkApprovedLeaveType,
    updatedApprovedLeaveType,
    managerSendMessageApproveLeaveTypeToMember
);

// End point PUT
router.put(
    '/manager/approved-leave-day/:id',
    checkParam,
    checkApprovedLeaveDay,
    updatedApprovedLeaveDay,
    managerSendMessageApproveLeaveDayToMember
);

// End point PUT
router.put(
    '/manager/approved-request-delete/:id',
    checkParam,
    checkApprovedRequestDelete,
    updatedApprovedRequestDelete,
    managerSendMessageApproveRequestDeleteToMember
);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
