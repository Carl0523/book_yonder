import express from "express";
import {userRegister, userLogin, userLogout, userOAuthLogin} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/oauth", userOAuthLogin);
router.post("/logout", userLogout);






export default router;