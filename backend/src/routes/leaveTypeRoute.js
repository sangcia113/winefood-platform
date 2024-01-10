const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { created, deleted, readed, updated } = require('../controllers/leaveTypeController');

const { checkBody, checkParam } = require('../middleWares/leaveTypeMiddleWare');

// End point POST
router.post('/', checkBody, created);

// End point GET
router.get('/', readed);

// End point PUT
router.put('/:id', checkBody, checkParam, updated);

// End point DELETE
router.delete('/:id', checkParam, deleted);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
