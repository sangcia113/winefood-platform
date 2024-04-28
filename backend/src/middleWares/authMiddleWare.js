const jwt = require('jsonwebtoken');

const authMiddleWare = {
    verifyToken: async (req, res, next) => {
        const accessToken = req.headers.authorization?.split(' ').pop();

        if (!accessToken)
            return res
                .status(400)
                .json({ error: -1082, message: 'Không có Token nào được cung cấp!' });

        jwt.verify(accessToken, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err)
                return res.status(400).json({ error: -1083, message: 'Không thể xác thực Token!' });

            req.decoded = decoded;

            next();
        });
    },

    checkPermission: roleId => (req, res, next) => {
        const userRoleId = req.decoded.roleId;

        if (!roleId.includes(userRoleId))
            return res.status(403).json({
                error: -1199,
                message: 'Tài khoản của bạn không có quyền thực hiện chức năng này!',
            });

        next();
    },
};

module.exports = authMiddleWare;
