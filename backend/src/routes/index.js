const router = require('express').Router();

// Import các middleWare và xử lý liên quan từ file authMiddleWare.js
const { verifyToken } = require('../middleWares/authMiddleWare');

// Import các route và xử lý liên quan từ file loginRoute.js
const loginRoute = require('./loginRoute');

// Import các route và xử lý liên quan từ file userRoute.js
const userRoute = require('./userRoute');

// Import các route và xử lý liên quan từ file roleRoute.js
const roleRoute = require('./roleRoute');

// Import các route và xử lý liên quan từ file departmentRoute.js
const departmentRoute = require('./departmentRoute');

// Import các route và xử lý liên quan từ file leaveTypeRoute.js
const leaveTypeRoute = require('./leaveTypeRoute');

// Import các route và xử lý liên quan từ file leaveListRoute.js
const leaveListRoute = require('./leaveListRoute');

// Import các route và xử lý liên quan từ file feedbackRoute.js
const feedbackRoute = require('./feedbackRoute');

// Import các route và xử lý liên quan từ file zaloAPIRoute.js
const zaloAPIRoute = require('./zaloAPIRoute');

// Import các route và xử lý liên quan từ file webhookRoute.js
const webhookRoute = require('./webhookRoute');

// Import các route và xử lý liên quan từ file loginRoute.js
const environmentLoginRoute = require('./environment/loginRoute');

const environmentContentDepartmentRoute = require('./environment/contentDepartmentRoute');

const environmentContentRoute = require('./environment/contentRoute');

const environmentClassifyRoute = require('./environment/classifyRoute');

const environmentUserRoute = require('./environment/userRoute');

/**
 * Sử dụng router con 'userRouter' với tiền tố '/user'.
 * Mọi route trong 'userRouter' sẽ được thêm tiền tố '/user'.
 * Ví dụ: /user/, /user/:id, /user/update, ...
 */
router.use('/leave/login', loginRoute);

router.use('/environment/login', environmentLoginRoute);

router.use('/webhook', webhookRoute);

router.use(verifyToken);

router.use('/leave/user', userRoute);

router.use('/leave/role', roleRoute);

router.use('/leave/department', departmentRoute);

router.use('/leave/type', leaveTypeRoute);

router.use('/leave/list', leaveListRoute);

router.use('/leave/feedback', feedbackRoute);

router.use('/environment/content-department', environmentContentDepartmentRoute);

router.use('/environment/content', environmentContentRoute);

router.use('/environment/classify', environmentClassifyRoute);

router.use('/environment/user', environmentUserRoute);

router.use('/zalo', zaloAPIRoute);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
