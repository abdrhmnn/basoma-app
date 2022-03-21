import express from "express";
import {
    getAllBantuan,
    getBantuanByID,
    createBantuan,
    deleteBantuan,
    updateBantuan
} from "../controller/Bantuan.js";

const router = express.Router();

router.get('/', getAllBantuan)
router.post('/', createBantuan)
router.get('/id/:id', getBantuanByID)
router.delete('/:id', deleteBantuan)
router.patch('/:id', updateBantuan)

export default router;