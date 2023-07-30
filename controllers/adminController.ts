import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type RequestItem = {
  username: string;
  password: string;
};

type ChangeCredentials = {
  username: string;
  password: string;
  oldPassword: string;
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password }: RequestItem = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error("Please provide both username and password");
    }
    const adminInfo = await prisma.admins.findUnique({
      where: {
        admin_id: 1,
      },
    });

    if (adminInfo?.username === username && adminInfo?.passkey === password) {
      await prisma.admins.update({
        where: {
          admin_id: 1,
        },
        data: {
          isLoggedIn: true,
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    next(error);
  }
};

const updateAdminCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, oldPassword, password }: ChangeCredentials = req.body;
    const adminInfo = await prisma.admins.findUnique({
      where: {
        admin_id: 1,
      },
    });
    if (oldPassword === adminInfo?.passkey || username) {
      await prisma.admins.update({
        where: {
          admin_id: 1,
        },
        data: {
          username: username || adminInfo?.username,
          passkey: password || adminInfo?.passkey,
        },
      });
    } else {
      res.status(400);
      throw new Error("changing credentials failed");
    }
  } catch (error) {
    next(error);
  }
};

export { updateAdminCredentials, login };
