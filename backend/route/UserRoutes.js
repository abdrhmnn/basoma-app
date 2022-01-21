import express from "express";
import { getAllUser, updateUser, getUserByID, createUser, deleteUser } from "../controller/User.js";

const router = express.Router();

router.get('/', getAllUser)
router.get('/:id', getUserByID)
router.post('/', createUser)
router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router;