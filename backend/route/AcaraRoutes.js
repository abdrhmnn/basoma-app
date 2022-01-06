import express from "express";
import { getAllAcara, createAcara, getAcaraByID, updateAcara, deleteAcara } from "../controller/Acara.js";

import { createMasukan } from "../controller/Masukan.js";

const router = express.Router();

router.get('/', getAllAcara)
router.get('/:id', getAcaraByID)
router.post('/', createAcara)
router.patch('/:id', updateAcara)
router.delete('/:id', deleteAcara)

router.post('/', createMasukan)

export default router;