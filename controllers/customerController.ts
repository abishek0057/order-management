import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, phone = null, email = null, address = null } = req.body;
    if (!name || !id) {
      res.status(400);
      throw new Error("Please add customer name and id");
    }
    const result = await prisma.customer.create({
      data: {
        customer_id: Number(id),
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        customer_address: address,
      },
    });
    res.status(201).json({ customer: result });
  } catch (error) {
    next(error);
  }
};

export { addCustomer };
