import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { validatePassword } from "../utils/password";
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
    const token = req.cookies.token;    
    
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }
    const namePass = `${loggedinInfo?.username ?? ""}${loggedinInfo?.passkey ?? ""}`    
    const isValidToken = await validatePassword(namePass, token)
    if (isValidToken) {
      req.user = loggedinInfo as AdminInfo;
      next();
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {    
    next(error);
  }
};

export default adminAuth;
