import { Router } from "express";
import { createRoom, deleteRoom, getRoom } from "../controllers/room.controller";

const router = Router();

router.get('/get', getRoom);
router.post('/create', createRoom);
router.delete('/:id', deleteRoom);

export default router;