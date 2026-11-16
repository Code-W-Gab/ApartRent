import multer from "multer";
import path from "node:path";
import { mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";

export const roomUploadDirectory = path.resolve(
  __dirname,
  "../../uploads/rooms"
);

mkdirSync(roomUploadDirectory, { recursive: true });

const allowedTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, roomUploadDirectory);
  },

  filename: (_req, file, callback) => {
    const extension = allowedTypes.get(file.mimetype);

    callback(null, `${randomUUID()}${extension}`);
  },
});

export const roomUpload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per image
    files: 6,
  },

  fileFilter: (_req, file, callback) => {
    if (!allowedTypes.has(file.mimetype)) {
      callback(new Error("Only JPG, PNG, and WebP images are allowed."));
      return;
    }

    callback(null, true);
  },
});