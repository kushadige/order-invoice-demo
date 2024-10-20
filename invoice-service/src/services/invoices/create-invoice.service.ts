import { InvoiceModel } from "@/models";
import { type CreateInvoiceRequest } from "@/schemas/invoice.schemas";

export class CreateInvoiceService {
  async create(invoiceData: CreateInvoiceRequest) {
    //       // Check if the invoice already exists
    // const existingInvoice = await invoiceService.findInvoiceByOrderId(message.id);
    // if (existingInvoice) {
    //   logger.info(`Invoice already exists for order ${message.id}`);
    //   return;
    // }

    // Waiting time for creating an invoice (between 10-20 seconds)
    const delay = Math.floor(Math.random() * 10000) + 10000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    const invoiceId = await this.generateInvoiceId();
    return await InvoiceModel.create({
      data: {
        invoiceId,
        orderDetails: invoiceData,
      },
    });
  }

  private async validate(invoiceData: any) {
    // ...
  }

  private async generateInvoiceId() {
    const lastInvoice = await InvoiceModel.findFirst({
      orderBy: { id: "desc" },
    });
    const lastInvoiceId = lastInvoice?.id;

    if (!lastInvoiceId) {
      return `INV-${new Date().getFullYear()}-0001`; // e.g. INV-2024-0001
    }

    const formattedId = (lastInvoiceId + 1).toString().padStart(4, "0");
    return `INV-${new Date().getFullYear()}-${formattedId}`;
  }
}
