const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ middleware
const { checkPermission } = require('../middleWares/authMiddleWare');

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
router.get('/history', checkPermission([1, 2, 3, 4, 5, 6]), readedHistory);

// End point GET
router.get('/leader', checkPermission([1, 2, 3, 4, 5]), readedLeader);

// End point GET
router.get('/manager', checkPermission([1, 2, 3]), readedManager);

// End point GET
router.get('/manager/search', checkPermission([1, 2, 3]), checkDate, readedManagerByDate);

// End point GET
router.get('/manager/other', checkPermission([1, 2, 3]), readedManagerOther);

// End point GET
router.get(
    '/manager/other/search',
    checkPermission([1, 2, 3]),
    checkDate,
    readedManagerOtherByDate
);

// End point GET
router.get('/manager/statistics', checkPermission([1, 2, 3]), readedManagerStatistics);

// End point GET
router.get(
    '/manager/statistics/search',
    checkPermission([1, 2, 3]),
    checkDate,
    readedManagerStatisticsByDate
);

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
    checkPermission([1, 2, 3, 4, 5]),
    checkParam,
    checkLeaderApproved,
    updatedLeaderApproved,
    leaderSendMessageApproveToManager
);

// End point PUT
router.put(
    '/leader/rejected/:id',
    checkPermission([1, 2, 3, 4, 5]),
    checkParam,
    checkLeaderRejected,
    updatedLeaderRejected,
    leaderSendMessageRejectToMember
);

// End point PUT
router.put(
    '/manager/approved/:id',
    checkPermission([1, 2, 3]),
    checkParam,
    checkManagerApproved,
    updatedManagerApproved,
    managerSendMessageApproveToMember
);

// End point PUT
router.put(
    '/manager/rejected/:id',
    checkPermission([1, 2, 3]),
    checkParam,
    checkManagerRejected,
    updatedManagerRejected,
    managerSendMessageRejectToMember
);

// End point PUT
router.put(
    '/manager/approved-leave-type/:id',
    checkPermission([1, 2, 3]),
    checkParam,
    checkApprovedLeaveType,
    updatedApprovedLeaveType,
    managerSendMessageApproveLeaveTypeToMember
);

// End point PUT
router.put(
    '/manager/approved-leave-day/:id',
    checkPermission([1, 2, 3]),
    checkParam,
    checkApprovedLeaveDay,
    updatedApprovedLeaveDay,
    managerSendMessageApproveLeaveDayToMember
);

// End point PUT
router.put(
    '/manager/approved-request-delete/:id',
    checkPermission([1, 2, 3]),
    checkParam,
    checkApprovedRequestDelete,
    updatedApprovedRequestDelete,
    managerSendMessageApproveRequestDeleteToMember
);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
