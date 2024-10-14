import express from "express";
import { createUser, fakeApi, login, signupRootUser, getUser, getManagers } from "../controllers/authController.js";
import { auth, isRoot } from "../middleware/Auth.js";

const router = express.Router();
router.post("/fake", fakeApi);
//Registering Root user
router.post("/createRootUser", signupRootUser);
// Route to create a new user, restricted to root user only
router.post("/create", auth, isRoot, createUser);

router.get("/getUser", auth, getUser);
router.get("/getManagers", auth, getManagers);


// Route for user login
router.post("/login", login);

export default router;
