const {
    created,
    readed,
    updated,
    deleted,
} = require('../../controllers/environment/classifyController');

const router = require('express').Router();

router.post('/', created);

router.get('/', readed);

router.put('/:id', updated);

router.delete('/:id', deleted);

module.exports = router;
