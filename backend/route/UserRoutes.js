import express from "express";
import { getAllUser, updateUser, getUserByID } from "../controller/User.js";

const router = express.Router();

router.get('/', getAllUser)
router.get('/:id', getUserByID)
router.patch('/:id', updateUser)

export default router;