import express from "express";
import { createSurvey, getAllSurvey } from "../controller/Survey.js";

const router = express.Router();

router.get('/', getAllSurvey)
router.post('/', createSurvey)

export default router;