import { CreateInvoiceService } from "./create-invoice.service";
import { UpdateInvoiceService } from "./update-invoice.service";
import { QueryInvoiceService } from "./query-invoice.service";
import { PaymentInvoiceService } from "./payment-invoice.service";
import { DeleteInvoiceService } from "./delete-invoice.service";
import {
  createInvoiceRequestSchema,
  type CreateInvoiceRequest,
} from "@/schemas/invoice.schemas";

export class InvoiceService {
  private createInvoiceService: CreateInvoiceService;
  private updateInvoiceService: UpdateInvoiceService;
  private queryInvoiceService: QueryInvoiceService;
  private paymentInvoiceService: PaymentInvoiceService;
  private deleteInvoiceService: DeleteInvoiceService;

  constructor() {
    this.createInvoiceService = new CreateInvoiceService();
    this.updateInvoiceService = new UpdateInvoiceService();
    this.queryInvoiceService = new QueryInvoiceService();
    this.paymentInvoiceService = new PaymentInvoiceService();
    this.deleteInvoiceService = new DeleteInvoiceService();
  }

  // Create invoice
  async createInvoice(invoiceData: CreateInvoiceRequest) {
    const validatedData = createInvoiceRequestSchema.parse(invoiceData);
    return this.createInvoiceService.create(validatedData);
  }

  // Update invoice
  updateInvoice(invoiceId: string, updatedData: any) {
    return this.updateInvoiceService.update(invoiceId, updatedData);
  }

  // Query invoice
  getInvoiceById(invoiceId: string) {
    return this.queryInvoiceService.getById(invoiceId);
  }

  getAllInvoices() {
    return this.queryInvoiceService.getAll();
  }

  // Mark invoice as paid
  markInvoiceAsPaid(invoiceId: string) {
    return this.paymentInvoiceService.markAsPaid(invoiceId);
  }

  // Delete invoice
  deleteInvoice(invoiceId: string) {
    return this.deleteInvoiceService.delete(invoiceId);
  }
}

export const invoiceService = new InvoiceService();
