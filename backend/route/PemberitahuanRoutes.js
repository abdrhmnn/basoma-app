import express from "express";
import { createPemberitahuan, getAllPemberitahuan, getPemberitahuanByID } from "../controller/Pemberitahuan.js";

const router = express.Router();

router.get('/', getAllPemberitahuan)
router.get('/id/:id', getPemberitahuanByID)
router.post('/', createPemberitahuan)

export default router;