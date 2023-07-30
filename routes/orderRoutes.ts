import { Router } from "express";
import {
  addOrder,
  getOrdersByStatus,
  changeOrderStatus,
} from "../controllers/orderController";
import adminAuth from "../middleware/authMiddleware";

const router = Router();

router.post("/add", addOrder);
router.get("/get/:status", getOrdersByStatus);
router.put("/changestatus", adminAuth, changeOrderStatus);

export default router;
