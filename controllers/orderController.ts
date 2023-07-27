import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type ItemRequest = {
  orderStatus: string;
  totalAmount: number;
  customerId: number;
  orderItems: Array<{
    itemId: number;
    quantity: number;
  }>;
};

const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { totalAmount, orderStatus, customerId, orderItems }: ItemRequest =
      req.body;
    const order = await prisma.orders.create({
      data: {
        total_amount: totalAmount,
        order_status: orderStatus,
        customer_id: customerId,
      },
    });
    for (const item of orderItems) {
      try {
        const orderItemsList = await prisma.order_item.create({
          data: {
            order_id: order.order_id,
            item_id: item.itemId,
            quantity: item.quantity,
          },
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }
    res.status(201).json({ customer: order });
  } catch (error) {
    next(error);
  }
};
export { addOrder };
