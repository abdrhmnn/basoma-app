import express from "express";
import { getAllHistoryKebijakan, createHistoryKebijakan, getHistoryByID, deleteHistoryKebijakan } from "../controller/HistoryKebijakan.js";

const router = express.Router();

router.get('/', getAllHistoryKebijakan)
router.get('/:id', getHistoryByID)
router.post('/', createHistoryKebijakan)
router.delete('/:id', deleteHistoryKebijakan)

export default router;