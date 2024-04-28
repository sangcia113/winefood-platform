const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ middleware
const { checkPermission } = require('../middleWares/authMiddleWare');

// Import các hàm xử lý yêu cầu từ controller
const { created, readed, updated, deleted } = require('../controllers/departmentController');

const { checkBody, checkIsExist, checkParam } = require('../middleWares/departmentMiddleware');

// End pont POST
router.post('/', checkPermission([1]), checkBody, checkIsExist, created);

// End point GET
router.get('/', readed);

// End point PUT
router.put('/:id', checkPermission([1]), checkParam, checkBody, updated);

// End point DELETE
router.delete('/:id', checkPermission([1]), checkParam, deleted);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
