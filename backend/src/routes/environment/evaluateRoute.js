const router = require('express').Router();

const { created, readed } = require('../../controllers/environment/evaluateController');

router.post('/', created);

router.get('/:departmentId', readed);

module.exports = router;
