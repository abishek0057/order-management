import { Router } from "express";
const router = Router();
import {
  getAllItems,
  addItem,
  updateItem,
  getItem,
  deleteItem,
} from "../controllers/itemController";
import adminAuth from "../middleware/authMiddleware";

router.get("/", adminAuth, getAllItems);
router.get("/:id", adminAuth, getItem);
router.post("/additem", adminAuth, addItem);
router.patch("/updateitem/:id", adminAuth, updateItem);
router.delete("/delete/:id", adminAuth, deleteItem);

export default router;
