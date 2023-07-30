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
      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(400);
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminInfo = await prisma.admins.findUnique({
      where: {
        admin_id: 1,
      },
    });

    if (adminInfo?.isLoggedIn) {
      await prisma.admins.update({
        where: {
          admin_id: 1,
        },
        data: {
          isLoggedIn: false,
        },
      });
      res.status(200).json({ message: "Logout successful" });
    } else {
      res.status(400);
      throw new Error("You are already logged out.");
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

    if (!adminInfo) {
      res.status(404);
      throw new Error("Admin not found");
    }

    if (username && oldPassword && password) {
      if (oldPassword !== adminInfo.passkey) {
        res.status(400);
        throw new Error("Incorrect old password");
      }

      await prisma.admins.update({
        where: {
          admin_id: 1,
        },
        data: {
          username,
          passkey: password,
          isLoggedIn: false,
        },
      });

      res
        .status(200)
        .json({ message: "Username and password changed successfully" });
    } else if (username && !oldPassword && !password) {
      await prisma.admins.update({
        where: {
          admin_id: 1,
        },
        data: {
          username,
          isLoggedIn: false,
        },
      });

      res.status(200).json({ message: "Username changed successfully" });
    } else if (!username && oldPassword && password) {
      if (oldPassword !== adminInfo.passkey) {
        res.status(400);
        throw new Error("Incorrect old password");
      }

      await prisma.admins.update({
        where: {
          admin_id: 1,
        },
        data: {
          passkey: password,
          isLoggedIn: false,
        },
      });

      res.status(200).json({ message: "Password changed successfully" });
    } else {
      res.status(400);
      throw new Error("Invalid combination of parameters provided");
    }
  } catch (error) {
    next(error);
  }
};

export { updateAdminCredentials, login, logout };
