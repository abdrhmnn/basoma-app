import express from "express";
import { createPesanBalas, getAllPesanBalas } from "../controller/PesanBalas.js";

const router = express.Router();

router.get('/', getAllPesanBalas)
router.post('/', createPesanBalas)

export default router;