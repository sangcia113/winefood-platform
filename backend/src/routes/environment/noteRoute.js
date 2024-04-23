const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const { created, readed } = require('../../controllers/environment/noteController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const { userId } = req.decoded;
        const userFolder = path.join(__dirname, `../../assets/environment/${userId}`);

        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }

        cb(null, userFolder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

router.post('/:departmentId', upload.array('fileList'), created);

router.get('/:departmentId', readed);

module.exports = router;
