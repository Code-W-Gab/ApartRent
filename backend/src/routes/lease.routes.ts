import { Router } from "express";
import { createLease } from "../controllers/leases.controller";
const router = Router()

router.post("/create", createLease)

export default router