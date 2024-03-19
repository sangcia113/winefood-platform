const router = require('express').Router();

// Import các hàm xử lý yêu cầu từ controller
const { readed } = require('../controllers/loginController');

const { getUserAgent } = require('../middleWares/collectBrowserInfoMiddleware');

router.post('/', readed, getUserAgent);

module.exports = router;
