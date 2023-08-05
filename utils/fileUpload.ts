import multer from "multer";
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = "uploads/";
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      (new Date().toISOString() + "-" + file.originalname).replace(/:| /g, "-")
    );
  },
});

const upload = multer({ storage: storage }).single("image");

export { upload };
