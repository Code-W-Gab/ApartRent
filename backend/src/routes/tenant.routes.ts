import { Router } from "express";
import { createTenant, getTenant } from "../controllers/tenant.controller";

const router = Router();

router.post('/create', createTenant);
router.get('/get', getTenant);

export default router;