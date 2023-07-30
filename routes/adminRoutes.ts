import { Router } from "express";
import { updateAdminCredentials, login } from "../controllers/adminController";
const router = Router();

router.post("/login", login);
router.post("/changecredentials", updateAdminCredentials);
export default router;
