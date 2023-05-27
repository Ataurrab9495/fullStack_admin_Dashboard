import express from "express";
import { getUser, getDashboard, getProfile, getLogin } from '../controllers/general.js'

const router = express.Router();

router.get("/user/:id", getUser);
router.get("/dashboard", getDashboard);
router.post("/profile", getProfile);
router.post("/login", getLogin);

export default router;