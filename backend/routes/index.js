const router = require('express').Router();

// Import các route và xử lý liên quan từ file userRouter.js
const userRouter = require('./userRouter');

// Import các route và xử lý liên quan từ file roleRouter.js
const roleRouter = require('./roleRouter');

// Import các route và xử lý liên quan từ file departmentRouter.js
const departmentRouter = require('./departmentRouter');

// Import các route và xử lý liên quan từ file departmentRouter.js
const leaveTypeRouter = require('./leaveTypeRouter');

// Import các route và xử lý liên quan từ file leaveListRouter.js
const leaveListRouter = require('./leaveListRouter');

// Import các route và xử lý liên quan từ file leaveListRouter.js
const zaloAPIRouter = require('./zaloAPIRouter');

/**
 * Sử dụng router con 'userRouter' với tiền tố '/user'.
 * Mọi route trong 'userRouter' sẽ được thêm tiền tố '/user'.
 * Ví dụ: /user/, /user/:id, /user/update, ...
 */
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/department', departmentRouter);
router.use('/leave-type', leaveTypeRouter);
router.use('/leave-list', leaveListRouter);

router.use('/zalo-api', zaloAPIRouter);

// Xuất router để sử dụng trong module khác index.js
module.exports = router;
