import express from "express";
import { createNilaiPrioritas, getAllNilaiPrioritas, getNilaiPrioritasByID } from "../controller/PengisianPrioritas.js";

const router = express.Router();

router.get('/', getAllNilaiPrioritas)
router.get('/:id', getNilaiPrioritasByID)
router.post('/', createNilaiPrioritas)

export default router;