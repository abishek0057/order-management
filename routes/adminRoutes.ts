import { Router } from "express";
import {
  updateAdminCredentials,
  login,
  logout,
} from "../controllers/adminController";
import adminAuth from "../middleware/authMiddleware";
const router = Router();

router.post("/login", login);
router.get("/logout", logout);
router.post("/changecredentials", adminAuth, updateAdminCredentials);
export default router;
