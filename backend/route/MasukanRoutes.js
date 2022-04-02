import express from "express";
import { getAllMasukan, createMasukan, getMasukanByID, deleteMasukan } from "../controller/Masukan.js";

const router = express.Router();

router.get('/', getAllMasukan)
router.get('/:id', getMasukanByID)
router.post('/', createMasukan)
router.delete('/:id', deleteMasukan)

export default router;