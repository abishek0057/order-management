import { Router } from "express";
import {
  addOrder,
  getOrdersByStatus,
  changeOrderStatus,
  getOrdersByOrderId,
} from "../controllers/orderController";
import adminAuth from "../middleware/authMiddleware";

const router = Router();

router.post("/add", addOrder);
router.get("/get/:status", getOrdersByStatus);
router.get("/get/orderid/:orderId", getOrdersByOrderId);
router.put("/changestatus", adminAuth, changeOrderStatus);

export default router;
