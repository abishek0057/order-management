import { Router } from "express";
import {
  addOrder,
  getOrdersByStatus,
  changeOrderStatus,
} from "../controllers/orderController";
const router = Router();

router.post("/add", addOrder);
router.get("/get/:status", getOrdersByStatus);
router.put("/changestatus/:id", changeOrderStatus);

export default router;
