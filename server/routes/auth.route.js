import express from 'express';
import {
    register,
    login,
    logout,
    sendingVerifyOtp,
    verifyEmail,
    isAuthenticated, resetOtp, verifyRestOtp
} from "../controller/auth.controller.js";
import userAuth from "../middleware/user.auth.js";


const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/get-otp", userAuth, sendingVerifyOtp);
router.post("/verify-otp", userAuth, verifyEmail);
router.get("/is-auth", userAuth, isAuthenticated);
router.post("/reset-otp", userAuth, resetOtp);
router.post("/verify-reset-otp", userAuth, verifyRestOtp);


export default router;
