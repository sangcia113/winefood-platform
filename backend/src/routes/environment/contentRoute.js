const router = require('express').Router();

const {
    created,
    readed,
    updated,
    deleted,
} = require('../../controllers/environment/contentController');

const { checkIsExist } = require('../../middleWares/environment/contentMiddleware');

router.post('/', checkIsExist, created);

router.get('/', readed);

router.put('/:id', updated);

router.delete('/:id', deleted);

module.exports = router;
