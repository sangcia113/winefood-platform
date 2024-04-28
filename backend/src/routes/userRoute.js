const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ middleware
const { checkPermission } = require('../middleWares/authMiddleWare');

const {
    checkBody,
    checkIsExist,
    checkIsDuplicate,
    checkParam,
} = require('../middleWares/userMiddleWare');

// Import các hàm xử lý yêu cầu từ controller
const {
    created,
    deleted,
    readed,
    updated,
    updatedPassword,
} = require('../controllers/userController');

// End point POST
router.post('/', checkPermission([1]), checkBody, checkIsExist, created);

// End point POST
router.post('/change-password', updatedPassword);

// End point GET
router.get('/', checkPermission([1]), readed);

// End point PUT
router.put('/:id', checkPermission([1]), checkParam, checkBody, checkIsDuplicate, updated);

// End point DELETE
router.delete('/:id', checkPermission([1]), checkParam, deleted);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
