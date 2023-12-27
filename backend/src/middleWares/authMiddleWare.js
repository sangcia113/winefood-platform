const jwt = require('jsonwebtoken');

const authMiddleWare = {
    verifyToken: async (req, res, next) => {
        const token = req.headers.authorization;

        if (!token)
            return res
                .status(400)
                .json({ error: -1082, message: 'Không có Token nào được cung cấp!' });

        console.log(token);
        console.log(process.env.PRIVATE_KEY);

        const fields = token.split(' ');

        if (fields.length !== 2) {
            throw new CustomErr('Method auth is not support', 403);
        }

        const token1 = fields[1];

        const decoded = jwt.verify(token1, process.env.PRIVATE_KEY);
        console.log(decoded);
        next();
    },
};

module.exports = { authMiddleWare };
