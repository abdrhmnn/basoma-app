import express from "express";
import { getAllMasukan, createMasukan } from "../controller/Masukan.js";

const router = express.Router();

router.get('/', getAllMasukan)
router.post('/', createMasukan)

export default router;