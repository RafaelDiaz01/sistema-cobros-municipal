import multer from "multer";
import path from "path";

const logoStorage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "logo_municipio" + ext);
  },
});

const qrStorage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, "qr_municipio" + ext);
  },
});

export const uploadLogo = multer({ storage: logoStorage });
export const uploadQR = multer({ storage: qrStorage });
