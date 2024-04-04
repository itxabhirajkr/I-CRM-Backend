import express from "express";
import { createUser, login } from "../controllers/authController";
import { auth, isRoot } from "../middleware/Auth";

const router = express.Router();

// Route to create a new user, restricted to root user only
router.post("/create", auth, isRoot, createUser);

// Route for user login
router.post("/login", login);

export default router;
