const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const {
    createZaloAPIHandler,
    readZaloAPIHandler,
    updateZaloAPIHandler,
    deleteZaloAPIHandler,
} = require('../controllers/zaloAPIController');

// End point POST
router.post('/', createZaloAPIHandler);

// End point GET
router.get('/', readZaloAPIHandler);

// End point PUT
router.put('/:id', updateZaloAPIHandler);

// End point DELETE
router.delete('/:id', deleteZaloAPIHandler);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
