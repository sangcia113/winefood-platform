const jwt = require('jsonwebtoken');

const authMiddleWare = {
    verifyToken: async (req, res, next) => {
        const token = req.headers.authorization;

        if (!token)
            return res
                .status(400)
                .json({ error: -1082, message: 'Không có Token nào được cung cấp!' });

        jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err) return res.status(400).json({ message: 'Không thể xác thực Token!' });
            return decoded;
        });
        console.log('Verify');
        next();
    },
};

module.exports = { authMiddleWare };
