const jwt = require('jsonwebtoken');

const authMiddleWare = {
    verifyToken: async (req, res) => {
        const accessToken = req.headers.authorization;

        if (!accessToken)
            return res
                .status(400)
                .json({ error: -1082, message: 'Không có Token nào được cung cấp!' });

        jwt.verify(accessToken, process.env.PRIVATE_KEY, (err, decoded) => {
            if (err) return res.status(400).json({ message: 'Không thể xác thực Token!' });
            return res.json({ decoded });
        });

        // jwt.verify(accessToken, process.env.PRIVATE_KEY, (err, decoded) => {
        //     if (err) {
        //         console.error(err);
        //         return res.status(400).json({ message: 'Không thể xác thực Token!' });
        //     }

        //     console.log(decoded);

        //     return decoded;
        // });

        // const fields = accessToken.split(' ');

        // if (fields.length !== 2) {
        //     throw new CustomErr('Method auth is not support', 403);
        // }

        // const accessToken = fields[1];

        // const decoded = jwt.verify(accessToken, process.env.PRIVATE_KEY);
        // console.log(decoded);
    },
};

module.exports = { authMiddleWare };
