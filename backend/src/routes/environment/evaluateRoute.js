const router = require('express').Router();

const {
    created,
    readed,
    readedAccumulator,
    readedDetailAccumulator,
} = require('../../controllers/environment/evaluateController');

router.post('/', created);

router.get('/accumulator', readedAccumulator);

router.get('/accumulator/detail', readedDetailAccumulator);

router.get('/:departmentId', readed);

module.exports = router;
