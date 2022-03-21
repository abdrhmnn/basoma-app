import express from "express";
import {
    createNilaiPrioritas,
    deleteNilaiPrioritas,
    getAllNilaiPrioritas,
    getNilaiPrioritasByUserID,
    getNilaiPrioritasByUserIDandIdentity
} from "../controller/PengisianPrioritas.js";

const router = express.Router();

router.get('/', getAllNilaiPrioritas)
router.get('/userId/:id', getNilaiPrioritasByUserID)
router.get('/orderIdentitas/:id', getNilaiPrioritasByUserIDandIdentity)
router.post('/', createNilaiPrioritas)
router.delete('/:id', deleteNilaiPrioritas)

export default router;