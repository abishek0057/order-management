import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { formatOutput } from "../utils/formattedOutput";
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

const getOrdersByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status }: { status?: string } = req.params;
    if (!["pending", "complete", "canceled"].includes(status)) {
      res.status(400);
      throw new Error("order status is either pending, complete or canceled");
    }
    const orders = await prisma.orders.findMany({
      select: {
        customer: {
          select: {
            customer_id: true,
            customer_name: true,
          },
        },
        order_id: true,
        created_at: true,
        total_amount: true,
        order_status: true,
        order_item: {
          select: {
            item: {
              select: {
                item_name: true,
                item_price: true,
              },
            },
            quantity: true,
          },
        },
      },
      where: {
        order_status: status,
      },
      orderBy: {
        created_at: "asc",
      },
    });
    const formattedResult = orders ? formatOutput(orders) : [];
    res.status(200).json({ orders: formattedResult });
  } catch (error) {
    next(error);
  }
};

const changeOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, status }: { id: number; status: string } = req.body;
    const updatedItem = await prisma.orders.update({
      where: {
        order_id: Number(id),
      },
      data: {
        order_status: status,
      },
    });
    res.status(200).json({ updatedItem });
  } catch (error) {
    next(error);
  }
};

export { addOrder, getOrdersByStatus, changeOrderStatus };
