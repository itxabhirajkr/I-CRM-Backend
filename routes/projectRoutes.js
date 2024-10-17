import express from "express";
import {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  // getClientFromProject,
} from "../controllers/projectController.js";
import {
  createProjectResource,
  getPersonAllocation,
  getProjectResources,
} from "../controllers/ResourceController.js";

const router = express.Router();

// Create a new project
router.post("/", createProject);

// Get all projects
router.get("/", getAllProjects);

// Get a specific project by ID
router.get("/:id", getProject);

// router.get("/projID/:id", getClientFromProject);

// Update a project by ID
router.put("/:id", updateProject);

// Delete a project by ID
router.delete("/:id", deleteProject);

router.post("/:projectId/create-project", createProjectResource);
router.get("/:personId/get-project-allocation", getPersonAllocation);
router.get("/:projectId/get-project-resources", getProjectResources);

export default router;
