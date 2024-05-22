import express from "express";
import {
  getAllInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.route("/").get(getAllInvoices).post(createInvoice);
router.route("/:id").get(getInvoice).patch(updateInvoice).delete(deleteInvoice);

export default router;
