import { Router } from "express";
const router = Router();
import {
  getAllItems,
  addItem,
  updateItem,
  getItem,
  deleteItem,
} from "../controllers/itemController";

router.get("/", getAllItems);
router.get("/:id", getItem);
router.post("/additem", addItem);
router.patch("/updateitem/:id", updateItem);
router.delete("/delete/:id", deleteItem);

export default router;
