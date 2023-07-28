function formatOutput(originalOutput: any[]): any[] {
  if (originalOutput.length < 0) return originalOutput;
  const formattedOutput = originalOutput.map((order: any) => {
    const orderItems = order.order_item.map((item: any) => ({
      item_name: item.item.item_name,
      quantity: item.quantity,
      item_price: item.item.item_price,
    }));

    const formattedOrder = {
      customer: {
        customer_id: order.customer.customer_id,
        customer_name: order.customer.customer_name,
      },
      order_id: order.order_id,
      created_at: order.created_at,
      total_amount: order.total_amount,
      order_status: order.order_status,
      order_items: orderItems,
    };

    return formattedOrder;
  });

  return formattedOutput;
}

export { formatOutput };
