import { PrismaClient } from "@prisma/client";

export const getLatestOrder = async (
  prisma: PrismaClient,
  customerId: number
) => {
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
      customer: {
        customer_id: customerId,
      },
      order_status: "pending",
    },
    orderBy: {
      created_at: "asc",
    },
  });

  return orders;
};
