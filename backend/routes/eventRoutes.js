import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createEvent,
  getMyEvents,
  updateEventStatus,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Protected routes
router.post("/create", authMiddleware, createEvent);
router.get("/my-events", authMiddleware, getMyEvents);
router.put("/:id/status", authMiddleware, updateEventStatus);
router.delete("/:id", authMiddleware, deleteEvent);

export default router;
