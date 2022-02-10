import express from "express";
import { getAllMasukan, createMasukan, deleteMasukan, getMasukanByID, updateMasukanByUserID } from "../controller/Masukan.js";

const router = express.Router();

router.get('/', getAllMasukan)
router.get('/:id', getMasukanByID)
router.post('/', createMasukan)
router.delete('/:id', deleteMasukan)
router.patch('/userId/:id', updateMasukanByUserID)

export default router;