import { Router } from "express";
import { createTenant, getTenant } from "../controllers/tenant.controller";
import { deleteRoom, updateRoom } from "../controllers/room.controller";

const router = Router();

router.post('/create', createTenant);
router.get('/get', getTenant);
router.put('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;