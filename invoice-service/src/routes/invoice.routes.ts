import express from "express";
import { invoiceController } from "../controllers/invoice.controller";

const router = express.Router();

router.get("/", invoiceController.fetchAllInvoices); // Get all invoices
router.get("/:id", invoiceController.fetchInvoiceById); // Get single invoice by id
router.post("/", invoiceController.createInvoice); // Create invoice
router.put("/:id", invoiceController.updateInvoice); // Update invoice
router.delete("/:id", invoiceController.deleteInvoice); // Delete invoice

export default router;
