import express from "express";
import {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";

const router = express.Router();

router.route("/").get(getAllClients).post(createClient);
router.route("/:id").get(getClient).patch(updateClient).delete(deleteClient);

export default router;