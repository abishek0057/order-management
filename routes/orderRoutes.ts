import { Router } from "express";
import { addOrder } from "../controllers/orderController";
const router = Router();

router.post("/add", addOrder);

export default router;
