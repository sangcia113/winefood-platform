const router = require('express').Router();

const {
    created,
    readed,
    readedByDepartment,
    deleted,
} = require('../../controllers/environment/contentDepartmentController');

const { checkIsExist } = require('../../middleWares/environment/contentDepartmentMiddleware');

router.post('/', checkIsExist, created);

router.get('/', readed);

router.get('/department/:departmentId', readedByDepartment);

router.delete('/:id', deleted);

module.exports = router;
