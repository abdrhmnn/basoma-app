import express from "express";
import { createAlternatif, deleteAlternatif, getAllAlternatif, getAlternatifByUserID } from "../controller/Alternatif.js";


const router = express.Router();

router.get('/', getAllAlternatif)
router.post('/', createAlternatif)
router.get('/userId/:id', getAlternatifByUserID)
router.delete('/:id', deleteAlternatif)

export default router;