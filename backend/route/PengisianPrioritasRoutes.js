import express from "express";
import { createNilaiPrioritas, getAllNilaiPrioritas, getNilaiPrioritasByUserID, getNilaiPrioritasByUserIDandIdentity } from "../controller/PengisianPrioritas.js";

const router = express.Router();

router.get('/', getAllNilaiPrioritas)
router.get('/:id', getNilaiPrioritasByUserID)
router.get('/orderIdentitas/:id', getNilaiPrioritasByUserIDandIdentity)
router.post('/', createNilaiPrioritas)

export default router;