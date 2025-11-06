import Event from "../models/Event.js";

// ✅ Create a new event
export const createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;

    const event = await Event.create({
      title,
      startTime,
      endTime,
      owner: req.user._id, // logged in user
      status: "BUSY",
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Create Event Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get logged-in user's events
export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ owner: req.user._id }).sort({
      startTime: 1,
    });

    res.json(events);
  } catch (error) {
    console.error("Get Events Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update an event status (make swappable, busy, etc.)
export const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { status },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Update Event Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Event deleted" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
