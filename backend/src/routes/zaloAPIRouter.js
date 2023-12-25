const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { zaloController } = require('../controllers/zaloAPIController');
const { zaloAPIMiddleWare } = require('../middleWares/zaloAPIMiddleWare');

// End point GET
router.get('/token', zaloController.read);

// End point GET
router.get('/info', zaloController.readAllZaloAPIInfo);

// End point PUT
router.put('/token', zaloAPIMiddleWare.checkUpdate, zaloController.update);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
