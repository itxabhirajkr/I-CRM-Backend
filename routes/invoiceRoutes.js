import express from "express";
import {
  getAllInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  generateInvoiceData,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.route("/").get(getAllInvoices).post(createInvoice);
router.route("/:id").get(getInvoice).delete(deleteInvoice);
router.route("/:invoiceId").put(updateInvoice);
router.get("/pdf/:id", generateInvoiceData);

export default router;
