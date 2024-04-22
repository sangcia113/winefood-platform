const contentDepartmentMiddleware = {
    checkIsExist: async (req, res, next) => {
        const { departments, contentId } = req.body;

        try {
            next();
        } catch (error) {
            res.status(500).json({
                error: -1001,
                message: 'Lỗi truy vấn cơ sở dữ liệu!',
            });
        }
    },
};
module.exports = contentDepartmentMiddleware;
