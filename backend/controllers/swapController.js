import Event from "../models/Event.js";
import SwapRequest from "../models/SwapRequest.js";

// ✅ GET all swappable slots from OTHER users
export const getSwappableSlots = async (req, res) => {
  try {
    const events = await Event.find({
      status: "SWAPPABLE",
      owner: { $ne: req.user._id },
    }).populate("owner", "name email");

    res.json(events);
  } catch (error) {
    console.error("Get Swappable Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ REQUEST A SWAP
export const requestSwap = async (req, res) => {
  try {
    const { myEventId, theirEventId } = req.body;

    const myEvent = await Event.findById(myEventId);
    const theirEvent = await Event.findById(theirEventId);

    if (!myEvent || !theirEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check ownership
    if (myEvent.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You do not own this event" });
    }

    // Both must be SWAPPABLE
    if (myEvent.status !== "SWAPPABLE" || theirEvent.status !== "SWAPPABLE") {
      return res.status(400).json({ message: "Events must be swappable" });
    }

    // ✅ Create swap request
    const swapRequest = await SwapRequest.create({
      requester: req.user._id,
      responder: theirEvent.owner,
      myEvent: myEventId,
      theirEvent: theirEventId,
      status: "PENDING",
    });

    // ✅ Mark both events as PENDING so they can't be swapped again
    myEvent.status = "SWAP_PENDING";
    theirEvent.status = "SWAP_PENDING";

    await myEvent.save();
    await theirEvent.save();

    res.status(201).json({
      message: "Swap request sent",
      swapRequest,
    });
  } catch (error) {
    console.error("Swap Request Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ RESPOND TO SWAP (ACCEPT OR REJECT)
export const respondToSwap = async (req, res) => {
  try {
    const { accept } = req.body;
    const requestId = req.params.id;

    const swap = await SwapRequest.findById(requestId)
      .populate("myEvent")
      .populate("theirEvent");

    if (!swap) return res.status(404).json({ message: "Swap request not found" });

    // Only responder can respond
    if (swap.responder.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const myEvent = swap.myEvent;
    const theirEvent = swap.theirEvent;

    if (accept === false) {
      swap.status = "REJECTED";
      await swap.save();

      // Reset both events to SWAPPABLE
      myEvent.status = "SWAPPABLE";
      theirEvent.status = "SWAPPABLE";

      await myEvent.save();
      await theirEvent.save();

      return res.json({ message: "Swap rejected" });
    }

    // ✅ ACCEPT SWAP → Transfer ownership
    const requesterId = swap.requester;
    const responderId = swap.responder;

    myEvent.owner = responderId;
    myEvent.status = "BUSY";

    theirEvent.owner = requesterId;
    theirEvent.status = "BUSY";

    swap.status = "ACCEPTED";

    await myEvent.save();
    await theirEvent.save();
    await swap.save();

    res.json({ message: "Swap accepted and events updated" });
  } catch (error) {
    console.error("Respond Swap Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET Incoming Swap Requests
export const getIncomingRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      responder: req.user._id,
    })
      .populate("myEvent")
      .populate("theirEvent")
      .populate("requester", "name email");

    res.json(requests);
  } catch (error) {
    console.error("Incoming Requests Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET Outgoing Swap Requests
export const getOutgoingRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      requester: req.user._id,
    })
      .populate("myEvent")
      .populate("theirEvent")
      .populate("responder", "name email");

    res.json(requests);
  } catch (error) {
    console.error("Outgoing Requests Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
