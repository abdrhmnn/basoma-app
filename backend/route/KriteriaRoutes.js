import express from "express";
import { getAllKriteria, updateKriteria } from "../controller/Kriteria.js";

const router = express.Router();

router.get('/', getAllKriteria)
router.patch('/:id', updateKriteria)

export default router;