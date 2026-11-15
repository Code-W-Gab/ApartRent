import { Router } from "express";
import { createLease, getLease } from "../controllers/leases.controller";
const router = Router()

router.post("/create", createLease)
router.get("/get", getLease)

export default router