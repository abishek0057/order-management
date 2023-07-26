import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type ItemRequest = {
  name: string;
  price: number;
};

const getAllItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await prisma.item.findMany();
    if (!result) {
      res.status(404);
      throw new Error("No item available");
    }
    res.status(201).json({ item: result });
  } catch (error) {
    next(error);
  }
};

const getItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      res.status(400);
      throw new Error("Id should be number");
    }
    const result = await prisma.item.findUnique({
      where: { item_id: Number(id) },
    });
    if (!result) {
      res.status(404);
      throw new Error("No item available");
    }
    res.status(201).json({ item: result });
  } catch (error) {
    next(error);
  }
};

const addItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price }: ItemRequest = req.body;
    if (!name && !price) {
      res.status(400);
      throw new Error("Please add item name and price");
    }
    const result = await prisma.item.create({
      data: {
        item_name: name,
        item_price: price,
      },
    });
    res.status(201).json({ item: result });
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, price }: ItemRequest = req.body;
    const updatedItem = await prisma.item.update({
      where: {
        item_id: Number(id),
      },
      data: {
        item_name: name,
        item_price: price,
      },
    });
    res.status(200).json({ updatedItem });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      res.status(400);
      throw new Error("Id should be number");
    }
    const userExist = await prisma.item.findUnique({
      where: { item_id: Number(id) },
    });
    if (userExist) {
      const deleteItem = await prisma.item.delete({
        where: { item_id: Number(id) },
      });
      res.status(201).json({ item: deleteItem });
    } else {
      res.status(404);
      throw new Error("No item available");
    }
  } catch (error) {
    next(error);
  }
};

export { getAllItems, getItem, addItem, updateItem, deleteItem };
