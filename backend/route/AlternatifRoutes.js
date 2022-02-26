import express from "express";
import { createAlternatif, getAllAlternatif, getAlternatifByUserID } from "../controller/Alternatif.js";


const router = express.Router();

router.get('/', getAllAlternatif)
router.post('/', createAlternatif)
router.get('/userId/:id', getAlternatifByUserID)

export default router;