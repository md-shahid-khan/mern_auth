import express from "express";
import {getUsers, getUserById, getUserByEmail} from "../controller/user.controller.js";
import userAuth from "../middleware/user.auth.js";

const router = express.Router();

router.get("/users",userAuth, getUsers);
router.post("/id",userAuth, getUserById);
router.post("/email",userAuth, getUserByEmail);

export default router;

