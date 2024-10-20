import { OrderModel } from "@/models";

export class QueryOrderService {
  getById(orderId: string) {
    return OrderModel.findUnique({
      where: {
        orderId,
      },
    });
  }

  getAll() {
    return OrderModel.findMany();
  }
}
