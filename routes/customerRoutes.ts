import { Router } from "express";
import { addCustomer } from "../controllers/customerController";
const router = Router();

router.post("/register", addCustomer);

export default router;
