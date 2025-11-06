import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSwappableSlots,
  requestSwap,
  respondToSwap,
  getIncomingRequests,
  getOutgoingRequests,
} from "../controllers/swapController.js";

const router = express.Router();

router.get("/swappable", authMiddleware, getSwappableSlots);
router.post("/request", authMiddleware, requestSwap);
router.post("/respond/:id", authMiddleware, respondToSwap);
router.get("/incoming", authMiddleware, getIncomingRequests);
router.get("/outgoing", authMiddleware, getOutgoingRequests);

export default router;
