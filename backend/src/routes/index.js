const router = require('express').Router();

// Import các middleWare và xử lý liên quan từ file authMiddleWare.js
const { verifyToken } = require('../middleWares/authMiddleWare');

// Import các route và xử lý liên quan từ file userRoute.js
const loginRoute = require('./loginRoute');

// Import các route và xử lý liên quan từ file userRoute.js
const userRoute = require('./userRoute');

// Import các route và xử lý liên quan từ file roleRoute.js
const roleRoute = require('./roleRoute');

// Import các route và xử lý liên quan từ file departmentRoute.js
const departmentRoute = require('./departmentRoute');

// Import các route và xử lý liên quan từ file departmentRoute.js
const leaveTypeRoute = require('./leaveTypeRoute');

// Import các route và xử lý liên quan từ file leaveListRoute.js
const leaveListRoute = require('./leaveListRoute');

// Import các route và xử lý liên quan từ file feedbackRoute.js
const feedbackRoute = require('./feedbackRoute');

// Import các route và xử lý liên quan từ file leaveListRoute.js
const zaloAPIRoute = require('./zaloAPIRoute');

// Import các route và xử lý liên quan từ file webhookRoute.js
const webhookRoute = require('./webhookRoute');

/**
 * Sử dụng router con 'userRouter' với tiền tố '/user'.
 * Mọi route trong 'userRouter' sẽ được thêm tiền tố '/user'.
 * Ví dụ: /user/, /user/:id, /user/update, ...
 */
router.use('/leave/login', loginRoute);

router.use('/webhook', webhookRoute);

router.use(verifyToken);

router.use('/leave/user', userRoute);

router.use('/leave/role', roleRoute);

router.use('/leave/department', departmentRoute);

router.use('/leave/type', leaveTypeRoute);

router.use('/leave/list', leaveListRoute);

router.use('/leave/feedback', feedbackRoute);

router.use('/zalo', zaloAPIRoute);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
