import express from "express";
import { sendEmail } from "../controller/SendEmailNotif.js";

const router = express.Router();

router.post('/', sendEmail)

export default router;