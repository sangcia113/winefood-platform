const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { userController } = require('../controllers/userController');
const { userMiddleWare } = require('../middleWares/userMiddleWare');

// End point POST
router.post(
    '/',
    userMiddleWare.checkBody,
    userMiddleWare.checkIsExist,
    userController.createHandler
);

// End point GET
router.get('/', userController.readHandler);

// End point PUT
router.put(
    '/:id',
    userMiddleWare.checkParam,
    userMiddleWare.checkBody,
    userController.updateHandler
);

// End point DELETE
router.delete('/:id', userMiddleWare.checkParam, userController.deleteHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
