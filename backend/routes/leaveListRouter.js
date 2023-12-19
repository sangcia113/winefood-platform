const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    createHandler,
    readHandler,
    readByDateHandler,
    readOtherHandler,
    readOtherByDateHandler,
    readStatisticsHandler,
    readStatisticsByDateHandler,
    updateApprovedHandler,
    updateRejectedHandler,
} = require('../controllers/leaveListController');

const {
    checkIsExisted,
    checkApproved,
    checkRejected,
    checkDate,
} = require('../middleWares/leaveListMiddleWare');

// End point POST
router.post('/', checkIsExisted, createHandler);

// End point GET
router.get('/', readHandler);

// End point GET
router.get('/search', checkDate, readByDateHandler);

// End point GET
router.get('/other', readOtherHandler);

// End point GET
router.get('/other/search', checkDate, readOtherByDateHandler);

// End point GET
router.get('/statistics', readStatisticsHandler);

// End point GET
router.get('/statistics/search', checkDate, readStatisticsByDateHandler);

// End point PUT
router.put('/approved/:id', checkApproved, updateApprovedHandler);

// End point PUT
router.put('/rejected/:id', checkRejected, updateRejectedHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
