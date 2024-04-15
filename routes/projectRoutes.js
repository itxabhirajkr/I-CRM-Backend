import express from "express";
import {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Create a new project
router.post("/", createProject);

// Get all projects
router.get("/", getAllProjects);

// Get a specific project by ID
router.get("/:id", getProject);

// Update a project by ID
router.put("/:id", updateProject);

// Delete a project by ID
router.delete("/:id", deleteProject);

export default router;
