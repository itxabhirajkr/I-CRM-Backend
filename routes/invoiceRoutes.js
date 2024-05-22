import express from "express";
import {
  getAllInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceById
} from "../controllers/invoiceController.js";

const router = express.Router();

router.route("/").get(getAllInvoices).post(createInvoice);
router.route("/:id").get(getInvoice).put(updateInvoice).delete(deleteInvoice);
router.get('/invoice/:id', getInvoiceById);

export default router;
