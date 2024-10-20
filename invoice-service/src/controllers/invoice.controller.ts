import prisma from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { invoiceService } from "@/services";
import { createInvoiceRequestSchema } from "@/schemas/invoice.schemas";
import { type NextFunction, type Request, type Response } from "express";

class InvoiceController {
  async fetchAllInvoices(req: Request, res: Response, next: NextFunction) {
    next(new Error("Not implemented (fetchAllInvoices)"));
  }

  async fetchInvoiceById(req: Request, res: Response, next: NextFunction) {
    next(new Error("Not implemented (fetchInvoiceById)"));
  }

  async createInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      await prisma.$transaction(async () => {
        const order = await invoiceService.createInvoice(data);
        // await orderOutboxService.createOutbox(order);
        logger.info(`Invoice created with data: ${data}`);

        res.status(201).json({
          message: "Order created successfully",
          order,
        });
      });

      // // Fatura oluşturma işlemi
      // const invoice = await saveInvoiceToDatabase(invoiceData);
      // // Fatura oluşturulduktan sonra mesaj gönder
      // await publishInvoiceMessage('invoices', JSON.stringify(invoice));
    } catch (error) {
      next(error);
    }
  }

  async updateInvoice(req: Request, res: Response, next: NextFunction) {
    next(new Error("Not implemented (updateInvoice)"));
  }

  async deleteInvoice(req: Request, res: Response, next: NextFunction) {
    next(new Error("Not implemented (deleteInvoice)"));
  }
}

export const invoiceController = new InvoiceController();
