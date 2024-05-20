import express from "express";
import {
  createPerson,
  getPeople,
  getPersonById,
  updatePerson,
  deletePerson,
  createUser,  login, signupRootUser
} from "../controllers/peopleController.js";
import { auth, isRoot } from "../middleware/Auth.js";

const router = express.Router();
//Registering Root user
router.post("/createRootUser", signupRootUser);
// Route to create a new user, restricted to root user only
router.post("/create", auth, isRoot, createUser);

// Route for user login
router.post("/login", login);

// Create a new person
router.post("/create", createPerson);

// Get all people
router.get("/", getPeople);

// Get a specific person by ID
router.get("/:id", getPersonById);

// Update a person by ID
router.put("/:id", updatePerson);

// Delete a person by ID
router.delete("/:id", deletePerson);

export default router;
