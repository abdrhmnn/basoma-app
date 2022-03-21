import express from "express";
import { getAllMasukan, createMasukan, getMasukanByID } from "../controller/Masukan.js";

const router = express.Router();

router.get('/', getAllMasukan)
router.get('/:id', getMasukanByID)
router.post('/', createMasukan)

export default router;