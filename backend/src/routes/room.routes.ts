import { Router } from "express";
import { createRoom, deleteRoom, getRoom, updateRoom } from "../controllers/room.controller";

const router = Router();

router.get('/get', getRoom);
router.post('/create', createRoom);
router.delete('/:id', deleteRoom);
router.put('/:id', updateRoom);

export default router;