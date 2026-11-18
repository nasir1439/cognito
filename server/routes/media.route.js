import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";
import { unlink } from "node:fs/promises";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router
  .route("/upload-video")
  .post(isAuthenticated, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const result = await uploadMedia(req.file.path);

      return res.status(200).json({
        success: true,
        message: "File Uploaded Successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: "Error Uploading File",
      });
    } finally {
      if (req.file?.path) {
        await unlink(req.file.path).catch((err) => {
          console.log("Temporary file cleanup failed:", err);
        });
      }
    }
  });

export default router;
