import express from 'express';
import {register, login, logout, sendingVerifyOtp, verifyEmail} from "../controller/auth.controller.js";


const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/get-otp", sendingVerifyOtp);
router.post("/verify", verifyEmail);


export default router;
