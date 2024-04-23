import express from "express";
// import { auth, isInstructor } from "../middleware/auth";
import {
  
  updateProfile,
  // getAllUserDetails,
  updateDisplayPicture,

} from "../controllers/profileController.js";

const router = express.Router();

// Profile routes
router.put("/updateProfile",  updateProfile);
// router.get("/getUserDetails",  getAllUserDetails);
router.put("/updateDisplayPicture",  updateDisplayPicture);

export default router;
