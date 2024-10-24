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
  updateProjectResource,
} from "../controllers/ResourceController.js";

import { auth } from "../middleware/Auth.js";

const router = express.Router();

// Create a new project
router.post("/", auth, createProject);

// Get all projects
router.get("/", auth, getAllProjects);

// Get a specific project by ID
router.get("/:id", auth, getProject);

// router.get("/projID/:id", getClientFromProject);

// Update a project by ID
router.put("/:id", auth, updateProject);

// Delete a project by ID
router.delete("/:id", auth, deleteProject);

router.post("/:projectId/create-project", auth, createProjectResource);
router.post(
  "/:projectId/:resourceId/update-project-resource",
  auth,
  updateProjectResource
);

router.get("/:personId/get-project-allocation", auth, getPersonAllocation);
router.get("/:projectId/get-project-resources", auth, getProjectResources);

export default router;
