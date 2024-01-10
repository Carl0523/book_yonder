import express from "express";
import {verifyToken} from "../utils/verifyToken";
import { updateProfile } from "../controllers/user.controller";

const router = express.Router();

router.post("/update/:id", verifyToken, updateProfile);


export default router;