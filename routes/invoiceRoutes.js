// Import required modules
import express from "express";
import {

  createInvoice, getAllInvoices, getInvoiceById, updateInvoice, deleteInvoice
} from "../controllers/invoiceController.js";

// Create a router instance
const router = express.Router();

// // Define routes
// router.route("/").get(getAllInvoices).post(createInvoice);
// router.route("/:id").get(getInvoice).put(updateInvoice).delete(deleteInvoice);
// router.route("/:id/pdf").get(generatePDF);
// Create a new invoice
router.post('/', createInvoice);

// Get all invoices
router.get('/', getAllInvoices);

// Get invoice by ID
router.get('/:id',getInvoiceById);

// Update invoice by ID
router.patch('/:id', updateInvoice);

// Delete invoice by ID
router.delete('/:id',deleteInvoice);

// Export the router
export default router;