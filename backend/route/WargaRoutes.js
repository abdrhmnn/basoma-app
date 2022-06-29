import express from "express";
import {
    createWarga,
    deleteWarga,
    deleteWargaByBantuanID,
    getAllWarga,
    getAllWargaAndSortByNilaiRangking,
    // getJoinHistoryAndWarga,
    getWargaByBantuanID,
    getWargaByNoKK,
    getWargaByUserID,
    updateWarga,
    updateWargaByUserID
} from "../controller/Warga.js";

const router = express.Router();

router.get('/', getAllWarga)
router.post('/', createWarga)
router.get('/bantuanID/:id', getWargaByBantuanID)
router.get('/noKK/:id', getWargaByNoKK)
router.get('/userId/:id', getWargaByUserID)
router.get('/sortRangking/:id', getAllWargaAndSortByNilaiRangking)
// router.get('/rahman/abdu', getJoinHistoryAndWarga)
router.patch('/update/:id', updateWarga)
router.patch('/update/warga/:id', updateWargaByUserID)
router.delete('/:id', deleteWarga)
router.delete('/bantuanId/:id', deleteWargaByBantuanID)

export default router;