import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function(req:any, file:any, cb:any) {
        console.log("Multer: destination function called");
        cb(null, path.join(__dirname, 'public/uploads')); 
    },
    filename: function(req, file, cb) {
        const ext = path.extname(file.originalname.toLowerCase());
        cb(null, Date.now() + ext);
    }
})

const fileFilter = (req:any, file:any, cb:any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' ) {
        cb(null, true)
    }
}

const upload = multer({
    storage,
    limits: { fieldSize: 1024 * 1024 },
    fileFilter

})

export default upload;