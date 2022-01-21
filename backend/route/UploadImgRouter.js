import express from "express";
import { saveImg } from "../controller/UploadImg.js";

const router = express.Router();

router.post('/', saveImg);

export default router;