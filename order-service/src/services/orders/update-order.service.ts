export class UpdateOrderService {
  update(orderId: string, updatedData: any) {
    // Logic to update an order
    return `Order with id ${orderId} has been updated with data: ${JSON.stringify(
      updatedData
    )}`;
  }
}
