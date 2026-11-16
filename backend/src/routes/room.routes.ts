import { Router } from "express";
import multer from "multer";
import {
  createRoom,
  deleteRoom,
  getRoom,
  updateRoom,
} from "../controllers/room.controller";
import { roomUpload } from "../middleware/roomUpload";

const router = Router();

router.get("/get", getRoom);

router.post(
  "/create",
  (req, res, next) => {
    roomUpload.array("photos", 6)(req, res, (error: unknown) => {
      if (error) {
        res.status(400).json({
          success: false,
          message:
            error instanceof multer.MulterError
              ? `Upload failed: ${error.message}`
              : error instanceof Error
                ? error.message
                : "Image upload failed",
        });
        return;
      }

      next();
    });
  },
  createRoom
);

router.delete("/:id", deleteRoom);
router.put("/:id", updateRoom);

export default router;