const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    createRoleHandler,
    readRoleHandler,
    updateRoleHandler,
    deleteRoleHandler,
} = require('../controllers/roleController');

// End point POST
router.post('/', createRoleHandler);

// End point GET
router.get('/', readRoleHandler);

// End point PUT
router.put('/:id', updateRoleHandler);

// End point DELETE
router.delete('/:id', deleteRoleHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
