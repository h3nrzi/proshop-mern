import express, { Request, Response } from "express";
import multer, { StorageEngine } from "multer";
import path from "path";
const router = express.Router();

const storage: StorageEngine = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },

  filename(req, file, callback) {
    callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function checkFileType(file: Express.Multer.File, callback: multer.FileFilterCallback) {
  const fileTypes = /jpg|jpeg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (!extname || !mimetype) return callback(new Error("Image only supports!"));

  callback(null, true);
}

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => checkFileType(file, callback),
});

router.post("/", upload.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
  }

  return res.send({
    message: "Image Uploaded",
    image: `${req.file.path}`,
  });
});

export default router;
