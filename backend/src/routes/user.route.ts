import express from "express";
import {verifyToken} from "../utils/verifyToken";
import { updateProfile, updatePassword } from "../controllers/user.controller";

const router = express.Router();

router.post("/update/:id", verifyToken, updateProfile);
router.post("/update_password/:id", verifyToken, updatePassword);


export default router;