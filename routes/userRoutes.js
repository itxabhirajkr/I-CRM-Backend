import express from "express";
import { fakeApi } from "../controllers/authController.js";

const router = express.Router();
router.post("/fake", fakeApi);

export default router;
