import express from "express";
import { createWarga, getAllWarga, getAllWargaAndSortByNilaiRangking, getWargaByBantuanID, getWargaByNoKTP, updateStatusWargaByUserID } from "../controller/Warga.js";

const router = express.Router();

router.get('/', getAllWarga)
router.post('/', createWarga)
router.get('/bantuanID/:id', getWargaByBantuanID)
router.get('/noKTP/:id', getWargaByNoKTP)
router.get('/sortRangking/:id', getAllWargaAndSortByNilaiRangking)
router.patch('/update/:id', updateStatusWargaByUserID)

export default router;