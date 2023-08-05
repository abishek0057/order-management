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
import { upload } from "../utils/fileUpload";

router.get("/", adminAuth, getAllItems);
router.get("/:id", adminAuth, getItem);
router.post("/additem", adminAuth, upload, addItem);
router.patch("/updateitem/:id", adminAuth, upload, updateItem);
router.delete("/delete/:id", adminAuth, deleteItem);

export default router;
