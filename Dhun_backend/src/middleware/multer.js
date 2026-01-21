import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback){
        callback(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/mp3" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};


const upload = multer({
    storage,
    fileFilter,
});

export default upload;