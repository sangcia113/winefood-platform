const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { userController } = require('../controllers/userController');

// End point POST
router.post('/', userController.createHandler);

// End point GET
router.get('/', userController.readHandler);

// End point PUT
router.put('/:id', userController.updateHandler);

// End point DELETE
router.delete('/:id', userController.deleteHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
