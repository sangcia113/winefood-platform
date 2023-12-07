const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    createDepartmentHandler,
    readDepartmentHandler,
    updateDepartmentHandler,
    deleteDepartmentHandler,
} = require('../controllers/departmentController');

// End point POST
router.post('/', createDepartmentHandler);

// End point GET
router.get('/', readDepartmentHandler);

// End point PUT
router.put('/:id', updateDepartmentHandler);

// End point DELETE
router.delete('/:id', deleteDepartmentHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
