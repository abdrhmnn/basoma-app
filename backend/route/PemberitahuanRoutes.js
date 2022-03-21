import express from "express";
import {
    createPemberitahuan,
    deletePemberitahuan,
    getAllPemberitahuan,
    getPemberitahuanByID
} from "../controller/Pemberitahuan.js";

const router = express.Router();

router.get('/', getAllPemberitahuan)
router.get('/id/:id', getPemberitahuanByID)
router.post('/', createPemberitahuan)
router.delete('/:id', deletePemberitahuan)

export default router;