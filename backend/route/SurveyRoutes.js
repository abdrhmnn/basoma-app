import express from "express";
import { createSurvey, deleteSurvey, getAllSurvey, getSurveyByID } from "../controller/Survey.js";

const router = express.Router();

router.get('/', getAllSurvey)
router.get('/:id', getSurveyByID)
router.post('/', createSurvey)
router.delete('/:id', deleteSurvey)

export default router;