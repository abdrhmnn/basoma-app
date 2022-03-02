import express from "express";
import { deleteImgBangunan_User, deleteImgKTP_User, deleteImgUser, saveImg, saveImgBannerBantuan, saveImgFormBangunan, saveImgFormKTP } from "../controller/UploadImg.js";

const router = express.Router();

router.post('/', saveImg);
router.post('/ktp', saveImgFormKTP);
router.post('/bangunan', saveImgFormBangunan);
router.post('/bantuan', saveImgBannerBantuan);
router.delete('/delete/imgUser/:imagename', deleteImgUser);
router.delete('/delete/imgKtpUser/:imagename', deleteImgKTP_User);
router.delete('/delete/imgBangunanUser/:imagename', deleteImgBangunan_User);

export default router;