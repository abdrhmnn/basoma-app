import express from "express";
import { saveImg, saveImgBannerBantuan, saveImgFormBangunan, saveImgFormKTP } from "../controller/UploadImg.js";

const router = express.Router();

router.post('/', saveImg);
router.post('/ktp', saveImgFormKTP);
router.post('/bangunan', saveImgFormBangunan);
router.post('/bantuan', saveImgBannerBantuan);

export default router;