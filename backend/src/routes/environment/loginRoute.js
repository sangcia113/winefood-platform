const router = require('express').Router();

const { readed } = require('../../controllers/environment/loginController');

router.post('/', readed);

module.exports = router;
