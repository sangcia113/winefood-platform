const router = require('express').Router();

const {
    readed,
    created,
    updated,
    deleted,
} = require('../../controllers/environment/userController');

router.post('/', created);

router.get('/', readed);

router.put('/:id', updated);

router.delete('/:id', deleted);

module.exports = router;
