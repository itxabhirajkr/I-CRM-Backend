import express from "express";
import { createUser, login } from "../controllers/authController.js";
import { auth, isRoot } from "../middleware/Auth.js";

const router = express.Router();

// Route to create a new user, restricted to root user only
router.post("/create", auth, isRoot, createUser);
// router.post("/create", createUser);

// Route for user login
router.post("/login", login);

export default router;
