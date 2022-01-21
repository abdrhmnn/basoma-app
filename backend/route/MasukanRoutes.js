import express from "express";
import { getAllMasukan, createMasukan, deleteMasukan } from "../controller/Masukan.js";

const router = express.Router();

router.get('/', getAllMasukan)
router.post('/', createMasukan)
router.delete('/:id', deleteMasukan)

export default router;