import multer from 'multer';

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, './public/resumes')
    },
    filename(req, file, cb) {
        const ext = file.originalname.split('.')[1]
      cb(null, `jobfinder-${req.currentUser.ID}.${ext}`);
    },
  
});
  
const upload = multer({
    limits: {
        fileSize: 70000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
        return cb(new Error('please upload a doc, docx or pdf file'));
        }
        return cb(null, true);
    },
    storage,
}).single('resume');

export default upload