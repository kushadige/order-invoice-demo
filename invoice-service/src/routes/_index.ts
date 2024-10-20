import express from "express";
import invoiceRoutes from "./invoice.routes";

const router = express.Router();

router.get("/", (_, res) => res.send("Invoice service is running"));
router.use("/api/invoices", invoiceRoutes);

export default router;
