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

// Subir foto de perfil
const fotoPerfilStorage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `foto_perfil_${req.user.id_usuario}${ext}`);
  },
});

export const uploadFotoPerfil = multer({ storage: fotoPerfilStorage });
export const uploadLogo = multer({ storage: logoStorage });
export const uploadQR = multer({ storage: qrStorage });
