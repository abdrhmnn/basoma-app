import express from "express";
import {
    deleteImgBantuan,
    deleteImgRumah,
    deleteImgUser,
    saveImgBannerBantuan,
    saveImgFormRumah,
    saveImgUser
} from "../controller/UploadImg.js";

const router = express.Router();

router.post('/user', saveImgUser);
router.post('/rumah', saveImgFormRumah);
router.post('/bantuan', saveImgBannerBantuan);
router.delete('/delete/imgUser/:imagename', deleteImgUser);
router.delete('/delete/imgRumah/:imagename', deleteImgRumah);
router.delete('/delete/imgBantuan/:imagename', deleteImgBantuan);

export default router;