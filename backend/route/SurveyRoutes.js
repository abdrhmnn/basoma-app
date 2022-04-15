import express from "express";
import { createSurvey, getAllSurvey, getSurveyByID } from "../controller/Survey.js";

const router = express.Router();

router.get('/', getAllSurvey)
router.get('/:id', getSurveyByID)
router.post('/', createSurvey)

export default router;