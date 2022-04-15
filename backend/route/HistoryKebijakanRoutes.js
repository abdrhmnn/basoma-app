import express from "express";
import { getAllHistoryKebijakan, createHistoryKebijakan, getHistoryByID } from "../controller/HistoryKebijakan.js";

const router = express.Router();

router.get('/', getAllHistoryKebijakan)
router.get('/:id', getHistoryByID)
router.post('/', createHistoryKebijakan)

export default router;