const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { created, readed, updated, deleted } = require('../controllers/departmentController');

const { checkBody, checkIsExist, checkParam } = require('../middleWares/departmentMiddleware');

// End pont POST
router.post('/', checkBody, checkIsExist, created);

// End point GET
router.get('/', readed);

// End point PUT
router.put('/:id', checkParam, checkBody, updated);

// End point DELETE
router.delete('/:id', checkParam, deleted);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
