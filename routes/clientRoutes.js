import express from "express";
import {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  getExistingPrefixes,
} from "../controllers/clientController.js";
import { auth } from "../middleware/Auth.js";

const router = express.Router();
router.get("/getPrefixes", auth, getExistingPrefixes);
router.route("/").get(getAllClients).post(createClient);
router.route("/:id").get(getClient).put(updateClient).delete(deleteClient);

export default router;
