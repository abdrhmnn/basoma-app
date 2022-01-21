import express from "express";
import { getAllBantuan, getBantuanByNama, getBantuanByKapasitasAndStatus, getBantuanByID, createBantuan, deleteBantuan } from "../controller/Bantuan.js";

const router = express.Router();

router.get('/', getAllBantuan)
router.post('/', createBantuan)
router.get('/:nama', getBantuanByNama)
router.get('/id/:id', getBantuanByID)
router.get('/:kapasitas/:status', getBantuanByKapasitasAndStatus)
router.delete('/:id', deleteBantuan)

export default router;