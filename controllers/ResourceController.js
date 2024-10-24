import Project from "../models/Project.js";
import APIFeatures from "../utils/apiFeatures.js";
import mongoose from "mongoose";

export const createProjectResource = async (req, res) => {
  const { projectId } = req.params;

  const resourceData = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $push: { resources: resourceData } },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(201).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const updateProjectResource = async (req, res) => {
  const { projectId, resourceId } = req.params;
  const updatedResourceData = req.body;

  try {
    // Find the project by projectId and the resource by resourceId
    const project = await Project.findOneAndUpdate(
      { _id: projectId, "resources._id": resourceId },
      { $set: { "resources.$": updatedResourceData } },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project or resource not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPersonAllocation = async (req, res) => {
  const { personId } = req.params;
  const saos = await Project.find();

  try {
    const result = await Project.aggregate([
      { $unwind: "$resources" },
      {
        $match: { "resources.personId": new mongoose.Types.ObjectId(personId) },
      },
      {
        $group: {
          _id: null,
          totalAllocation: { $sum: "$resources.defaultAllocation" },
        },
      },
    ]);

    const totalAllocation = result.length > 0 ? result[0].totalAllocation : 0;
    return res.status(200).json({ totalAllocation });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProjectResources = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId)
      .select("resources").populate("resources.personId")

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json(project.resources);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
