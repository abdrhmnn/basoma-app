import express from "express";
import { saveImg, saveImgFormBangunan, saveImgFormKTP } from "../controller/UploadImg.js";

const router = express.Router();

router.post('/', saveImg);
router.post('/ktp', saveImgFormKTP);
router.post('/bangunan', saveImgFormBangunan);

export default router;