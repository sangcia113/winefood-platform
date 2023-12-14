const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    readLeaveListHandler,
    createLeaveListHandler,
    readLeaveListByDateHandler,
    readLeaveListOtherHandler,
    readLeaveListOtherByDateHandler,
    readLeaveListStatisticsHandler,
    readLeaveListStatisticsByDateHandler,
} = require('../controllers/leaveListController');

const { checkleaveListExistedMiddleWare } = require('../middleWares/leaveListMiddleWare');

// End point POST
router.post('/', checkleaveListExistedMiddleWare, createLeaveListHandler);

// End point GET
router.get('/', readLeaveListHandler);

// End point GET
router.get('/search', readLeaveListByDateHandler);

// End point GET
router.get('/other', readLeaveListOtherHandler);

// End point GET
router.get('/other/search', readLeaveListOtherByDateHandler);

// End point GET
router.get('/statistics', readLeaveListStatisticsHandler);

// End point GET
router.get('/statistics/search', readLeaveListStatisticsByDateHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
