import express from "express";
import { getAllMasukan, createMasukan, deleteMasukan, getMasukanByID, updateMasukanByUserID, getMasukanByUserID } from "../controller/Masukan.js";

const router = express.Router();

router.get('/', getAllMasukan)
router.get('/:id', getMasukanByID)
router.get('/userId/:id', getMasukanByUserID)
router.post('/', createMasukan)
router.delete('/:id', deleteMasukan)
router.patch('/userId/:id', updateMasukanByUserID)

export default router;