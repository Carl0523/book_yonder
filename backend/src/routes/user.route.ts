import express from "express";
import {verifyToken} from "../utils/verifyToken";
import { updateProfile, updatePassword, deleteAccount, updateAvatar } from "../controllers/user.controller";

const router = express.Router();

router.post("/update/:id", verifyToken, updateProfile);
router.post("/update_password/:id", verifyToken, updatePassword);
router.post("/update_avatar/:id", verifyToken, updateAvatar);
router.post("/delete_account/:id", verifyToken, deleteAccount);


export default router;