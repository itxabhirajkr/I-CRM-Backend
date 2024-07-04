import Project from "../models/Project.js";
import APIFeatures from "../utils/apiFeatures.js";

// Create a new project
async function createProject(req, res) {
  try {
    const project = new Project(req.body);
    const result = await project.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const features = new APIFeatures(Project.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const projects = await features.query;

    res.status(200).json({
      status: "success",
      results: projects.length,
      data: {
        projects,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific project by ID
async function getProject(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a specific project by ID
// async function getClientFromProject(req, res) {
//   try {
//     const project = await Project.findById(req.body) // Populate the clientId field with customerDisplayName
//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }
//       // Debugging: Log the populated project object to verify structure
//       console.log(project.clientId);
 
//     // Extract the customerDisplayName from the populated client document
//     const customerDisplayName = project.clientId;
//     res.json({ customerDisplayName });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }
// Update a project by ID
async function updateProject(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a project by ID
async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  // getClientFromProject,
};
