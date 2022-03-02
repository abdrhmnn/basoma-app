import express from "express";
import { deleteImgBangunan_User, deleteImgKTP_User, deleteImgUser, saveImgBannerBantuan, saveImgFormBangunan, saveImgFormKTP, saveImgUser } from "../controller/UploadImg.js";

const router = express.Router();

router.post('/user', saveImgUser);
router.post('/ktp', saveImgFormKTP);
router.post('/bangunan', saveImgFormBangunan);
router.post('/bantuan', saveImgBannerBantuan);
router.delete('/delete/imgUser/:imagename', deleteImgUser);
router.delete('/delete/imgKtpUser/:imagename', deleteImgKTP_User);
router.delete('/delete/imgBangunanUser/:imagename', deleteImgBangunan_User);

export default router;