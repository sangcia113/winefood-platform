const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { zaloAPIController } = require('../controllers/zaloAPIController');
const { zaloAPIMiddleWare } = require('../middleWares/zaloAPIMiddleWare');

// End point GET
router.get('/token', zaloAPIController.read);

// End point GET
router.get('/user', zaloAPIController.readUser);

// End point PUT
router.put('/token', zaloAPIMiddleWare.checkUpdate, zaloAPIController.update);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
