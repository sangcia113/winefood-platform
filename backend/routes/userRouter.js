const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    createUserHandler,
    readUserHandler,
    updateUserHandler,
    deleteUserHandler,
} = require('../controllers/userController');

// End point POST
router.post('/', createUserHandler);

// End point GET
router.get('/', readUserHandler);

// End point PUT
router.put('/:id', updateUserHandler);

// End point DELETE
router.delete('/:id', deleteUserHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
