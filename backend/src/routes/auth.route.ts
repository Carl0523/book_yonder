import express from "express";
import {userRegister, userLogin, userLogout, userGoogleLogin} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/google", userGoogleLogin);
router.post("/logout", userLogout);






export default router;