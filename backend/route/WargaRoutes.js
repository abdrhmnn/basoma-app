import express from "express";
import {
    createWarga,
    deleteWarga,
    getAllWarga,
    getAllWargaAndSortByNilaiRangking,
    getWargaByBantuanID,
    getWargaByNoKK,
    getWargaByUserID,
    updateWarga
} from "../controller/Warga.js";

const router = express.Router();

router.get('/', getAllWarga)
router.post('/', createWarga)
router.get('/bantuanID/:id', getWargaByBantuanID)
router.get('/noKK/:id', getWargaByNoKK)
router.get('/userId/:id', getWargaByUserID)
router.get('/sortRangking/:id', getAllWargaAndSortByNilaiRangking)
router.patch('/update/:id', updateWarga)
router.delete('/:id', deleteWarga)

export default router;