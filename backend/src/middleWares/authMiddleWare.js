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
};

module.exports = authMiddleWare;
