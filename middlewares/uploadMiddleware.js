// middlewares/uploadMiddleware.js
// placeholder if you need file uploads with multer
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
module.exports = upload;
