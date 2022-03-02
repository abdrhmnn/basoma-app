import express from "express";
import { createWarga, deleteWargaByUserID, getAllWarga, getAllWargaAndSortByNilaiRangking, getWargaByBantuanID, getWargaByNoKTP, getWargaByUserID, updateStatusWargaByUserID } from "../controller/Warga.js";

const router = express.Router();

router.get('/', getAllWarga)
router.post('/', createWarga)
router.get('/bantuanID/:id', getWargaByBantuanID)
router.get('/noKTP/:id', getWargaByNoKTP)
router.get('/userId/:id', getWargaByUserID)
router.get('/sortRangking/:id', getAllWargaAndSortByNilaiRangking)
router.patch('/update/:id', updateStatusWargaByUserID)
router.delete('/:id', deleteWargaByUserID)

export default router;