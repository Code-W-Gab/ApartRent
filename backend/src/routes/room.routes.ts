import { Router } from "express";
import { createRoom, getRoom } from "../controllers/room.controller";

const router = Router();

router.get('/getAll', getRoom);
router.post('/create', createRoom);

export default router;