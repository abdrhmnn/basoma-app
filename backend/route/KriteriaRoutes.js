import express from "express";
import { deleteKriteria, getAllKriteria, getKriteriaByID, updateKriteria } from "../controller/Kriteria.js";

const router = express.Router();

router.get('/', getAllKriteria)
router.get('/:id', getKriteriaByID)
router.patch('/:id', updateKriteria)
router.delete('/:id', deleteKriteria)

export default router;