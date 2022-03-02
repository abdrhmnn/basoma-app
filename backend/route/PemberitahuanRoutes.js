import express from "express";
import { createPemberitahuan, deletePemberitahuanByUserID, getAllPemberitahuan, getPemberitahuanByID } from "../controller/Pemberitahuan.js";

const router = express.Router();

router.get('/', getAllPemberitahuan)
router.get('/id/:id', getPemberitahuanByID)
router.post('/', createPemberitahuan)
router.delete('/:id', deletePemberitahuanByUserID)

export default router;