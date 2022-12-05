const multer = require('multer');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  file.mimetype === 'image/png' ||
  file.mimetype === 'image/jpg' ||
  file.mimetype === 'image/jpeg'
    ? cb(null, true)
    : cb(new Error('Invalid file type'));
};

module.exports = multer({
  storage: fileStorage,
  limits: { fileSize: 1024 * 1024 * 9 },
  fileFilter: fileFilter,
});
