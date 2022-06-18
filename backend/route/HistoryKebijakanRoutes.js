import express from "express";
import { getAllHistoryKebijakan, createHistoryKebijakan, getHistoryByID, deleteHistoryKebijakan, getHistoryInTableUser, getHistoryInTableUserByID } from "../controller/HistoryKebijakan.js";

const router = express.Router();

router.get('/', getAllHistoryKebijakan)
router.get('/:id', getHistoryByID)
router.get('/join/table', getHistoryInTableUser)
router.get('/join/table/:id', getHistoryInTableUserByID)
router.post('/', createHistoryKebijakan)
router.delete('/:id', deleteHistoryKebijakan)

export default router;