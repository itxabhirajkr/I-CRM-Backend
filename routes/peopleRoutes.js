import express from "express";
import {
  createPerson,
  getPeople,
  getPersonById,
  updatePerson,
  deletePerson,
} from "../controllers/peopleController.js";

const router = express.Router();

// Create a new person
router.post("/", createPerson);

// Get all people
router.get("/", getPeople);

// Get a specific person by ID
router.get("/:id", getPersonById);

// Update a person by ID
router.put("/:id", updatePerson);

// Delete a person by ID
router.delete("/:id", deletePerson);

export default router;
