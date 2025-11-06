import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    responder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    myEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    theirEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);
export default SwapRequest;
