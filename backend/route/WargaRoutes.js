import express from "express";
import { createWarga, getAllWarga } from "../controller/Warga.js";

const router = express.Router();

router.get('/', getAllWarga)
router.post('/', createWarga)

export default router;