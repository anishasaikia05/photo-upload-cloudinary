const multer = require('multer');
const path = require('path');

// multer config
module.exports = multer({
  //  If no destination is given, the operating system’s default directory for temporary files is used.
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if(ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      cd(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  }
})