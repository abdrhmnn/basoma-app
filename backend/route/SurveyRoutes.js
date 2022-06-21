import express from "express";
import { createSurvey, deleteSurvey, getAllSurvey, getDetailSurveyInTableWarga, getSurveyByID, getSurveyInTableWarga } from "../controller/Survey.js";

const router = express.Router();

router.get('/', getAllSurvey)
router.get('/:id', getSurveyByID)
router.get('/join-survey/cetak', getSurveyInTableWarga)
router.get('/join-survey/cetakDetail/:id', getDetailSurveyInTableWarga)
router.post('/', createSurvey)
router.delete('/:id', deleteSurvey)

export default router;