import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const addCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phone = null, email = null, address = null } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Please add customer name");
    }
    const result = await prisma.customer.create({
      data: {
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
