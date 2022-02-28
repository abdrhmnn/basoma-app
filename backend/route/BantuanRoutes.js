import express from "express";
import { getAllBantuan, getBantuanByNama, getBantuanByID, createBantuan, deleteBantuan, getBantuanByKapasitas, updateBantuan } from "../controller/Bantuan.js";

const router = express.Router();

router.get('/', getAllBantuan)
router.post('/', createBantuan)
router.get('/:nama', getBantuanByNama)
router.get('/id/:id', getBantuanByID)
router.get('/kapasitas/:kapasitas', getBantuanByKapasitas)
router.delete('/:id', deleteBantuan)
router.patch('/:id', updateBantuan)

export default router;