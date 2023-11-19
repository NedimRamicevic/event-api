const { Event } = require("../models/Event.js");
const multer = require("multer");
const { default: mongoose } = require("mongoose");
const { Category } = require("../models/Category.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const EventController = {
  getAll: async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      console.log(error);
    }
  },
  getById: async (req, res) => {
    try {
      const event = await Event.findOne({ _id: req.params.id });
      res.json(event);
    } catch (error) {
      console.log(error);
    }
  },
  getByName: async (req, res) => {
    try {
      const event = await Event.findOne({ name: req.params.name });
      res.json(event);
    } catch (error) {
      console.log(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      const event = await Event.deleteOne({ _id: req.params.id });
      res.json(event);
    } catch (error) {
      console.log(error);
    }
  },
  getImage: async (req, res) => {
    try {
      const event = await Event.getById(req.params.eventId);
      if (!event || !event.image) {
        return res.status(404).json({ error: "Image not found" });
      }

      res.set("Content-Type", event.image.contentType);
      res.send(event.image.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  createEvent: async (req, res) => {
    const { originalname, mimetype, buffer } = req.file;
    console.log("Received file:", req.file);
    console.log("Received form data:", req.body);
    try {
      const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.eventName,
        description: req.body.description,
        startDate: req.body.ticketSaleStartDate,
        endDate: req.body.ticketSaleEndDate,
        eventDate: req.body.eventDate,
        city: req.body.city,
        venue: req.body.venue,
        category: req.body.category,
        image: {
          filename: originalname,
          contentType: mimetype,
          data: buffer,
        },
      });
      const newEvent = await event.save();
      res.json(newEvent);
    } catch (error) {
      console.log(error);
    }
  },
  // add: async (req, res) => {
  //   try {
  //     const image = req.body.image;
  //     console.log("Received form image:", image);
  //     const event = new Event({
  //       _id: new mongoose.Types.ObjectId(),
  //       image: {
  //         data: Buffer.from(image.split(",")[1], "base64"),
  //       },
  //       name: req.body.eventName,
  //       description: req.body.description,
  //       startDate: req.body.ticketSaleStartDate,
  //       endDate: req.body.ticketSaleEndDate,
  //       eventDate: req.body.eventDate,
  //       city: req.body.city,
  //       venue: req.body.venue,
  //       category: req.body.category,
  //     });

  //     const newEvent = await event.save();
  //     res.json(newEvent);
  //   } catch (error) {
  //     console.error("Error adding event:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
  add: async (req, res) => {
    try {
      const { image, ...otherFormData } = req.body;

      if (!req.file) {
        return res
          .status(400)
          .json({ error: "Image is missing in the request." });
      }

      const { originalname, mimetype, buffer } = req.file;

      console.log("Image data:", req.file);

      const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.eventName,
        ticketCount: 40,
        image: {
          filename: originalname,
          contentType: mimetype,
          data: buffer,
        },
        ...otherFormData,
      });

      const newEvent = await event.save();
      res.json(newEvent);
    } catch (error) {
      console.error("Error adding event:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateTickets: async (req, res) => {
    try {
      const eventId = req.params.id;
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: eventId },
        {
          ticket: [...ticket, req.body.ticket],
        },
        { new: true } // To return the updated document
      );

      if (!updatedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }

      res.json(updatedEvent);
    } catch (error) {
      console.error("Error updating event city:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = { EventController };
