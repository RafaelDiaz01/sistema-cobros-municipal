import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

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

// Subir foto de perfil
const fotoPerfilStorage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase() || ".jpg";
    const nombreUnico = "foto_perfil_" + req.user.id_usuario + "" + randomUUID() + extension;
    cb(null, nombreUnico);
  },
});

export const uploadFotoPerfil = multer({ storage: fotoPerfilStorage });
export const uploadLogo = multer({ storage: logoStorage });
export const uploadQR = multer({ storage: qrStorage });
