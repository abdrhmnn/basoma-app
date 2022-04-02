import express from "express";
import {
    deleteImgBantuan,
    deleteImgKK,
    deleteImgKTP,
    deleteImgUser,
    saveImgBannerBantuan,
    saveImgFormKK,
    saveImgFormKTP,
    saveImgUser
} from "../controller/UploadImg.js";

const router = express.Router();

router.post('/user', saveImgUser);
router.post('/kk', saveImgFormKK);
router.post('/ktp', saveImgFormKTP);
router.post('/bantuan', saveImgBannerBantuan);
router.delete('/delete/imgUser/:imagename', deleteImgUser);
router.delete('/delete/imgKtpUser/:imagename', deleteImgKTP);
router.delete('/delete/imgKkUser/:imagename', deleteImgKK);
router.delete('/delete/imgBantuan/:imagename', deleteImgBantuan);

export default router;