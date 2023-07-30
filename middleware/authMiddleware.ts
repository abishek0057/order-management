import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type RequestItem = {
  username: string;
  password: string;
};

type AdminInfo = {
  admin_id: number;
  username: string;
  passkey: string;
  isLoggedIn: boolean;
};

declare global {
  namespace Express {
    interface Request {
      user?: AdminInfo;
    }
  }
}

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loggedinInfo = await prisma.admins.findUnique({
      where: {
        admin_id: 1,
      },
    });
    if (loggedinInfo?.isLoggedIn) {
      req.user = loggedinInfo;
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
};

export default adminAuth;
