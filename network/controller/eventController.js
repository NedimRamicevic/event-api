const { Event } = require("../models/Event.js");
const { default: mongoose } = require("mongoose");
const { Category } = require("../models/Category.js");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dn339ykdp",
  api_key: "656569933346817",
  api_secret: "2l5nbETzOY7DDs7lLbQSfVPKV5Y",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const timestamp = Date.now();
    const uniqueFilename = `image_${timestamp}`;
    return {
      folder: "some_folder_name",
      format: "png",
      public_id: uniqueFilename,
    };
  },
});

// const storage = multer.memoryStorage();
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

  // IMAGE UPLOAD WITH BUFFER

  // createEvent: async (req, res) => {
  //   const { originalname, mimetype, buffer } = req.file;
  //   console.log("Received file:", req.file);
  //   console.log("Received form data:", req.body);
  //   try {
  //     const event = new Event({
  //       _id: new mongoose.Types.ObjectId(),
  //       name: req.body.eventName,
  //       description: req.body.description,
  //       startDate: req.body.ticketSaleStartDate,
  //       endDate: req.body.ticketSaleEndDate,
  //       eventDate: req.body.eventDate,
  //       city: req.body.city,
  //       venue: req.body.venue,
  //       category: req.body.category,
  //       image: {
  //         filename: originalname,
  //         contentType: mimetype,
  //         data: buffer,
  //       },
  //     });
  //     const newEvent = await event.save();
  //     res.json(newEvent);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // add: async (req, res) => {
  //   try {
  //     const { image, ...otherFormData } = req.body;

  //     if (!req.file) {
  //       return res
  //         .status(400)
  //         .json({ error: "Image is missing in the request." });
  //     }

  //     const { originalname, mimetype, buffer } = req.file;

  //     console.log("Image data:", req.file);

  //     const event = new Event({
  //       _id: new mongoose.Types.ObjectId(),
  //       name: req.body.eventName,
  //       ticketCount: 40,
  //       image: {
  //         filename: originalname,
  //         contentType: mimetype,
  //         data: buffer,
  //       },
  //       ...otherFormData,
  //     });

  //     const newEvent = await event.save();
  //     res.json(newEvent);
  //   } catch (error) {
  //     console.error("Error adding event:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // },
  createEvent: [
    upload.single("image"),
    async (req, res) => {
      console.log("Received file:", req.file);
      console.log("Received form data:", req.body);
      try {
        const cloud_name = "dn339ykdp";
        const public_id = req.file.filename.split(".")[0];
        const cloudinaryURL = `https://res.cloudinary.com/${cloud_name}/image/upload/${public_id}`;
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
          image: cloudinaryURL,
        });
        const newEvent = await event.save();
        res.json(newEvent);
      } catch (error) {
        console.log(error);
      }
    },
  ],

  add: [
    upload.single("image"),
    async (req, res) => {
      try {
        const { image, ...otherFormData } = req.body;
        console.log("Received data:", otherFormData);
        if (!req.file) {
          return res
            .status(400)
            .json({ error: "Image is missing in the request." });
        }

        console.log("Image data:", req.file);

        // Check if the category exists or create a new one
        const { category, ...eventData } = otherFormData;
        let existingCategory = await Category.findOne({ name: category });

        if (!existingCategory) {
          // If category doesn't exist, create a new category
          existingCategory = await Category.create({ name: category });
        }

        // check if the venue exists or create a new one
        const { venue } = eventData;
        let existingVenue = await Venue.findOne({ name: venue });

        if (!existingVenue) {
          // If venue doesn't exist, create a new venue
          existingVenue = await Venue.create({ name: venue, city: city });
        }

        // check if the artist exists or create a new one
        const { artist } = eventData;
        let existingArtist = await Artist.findOne({ name: artist });

        if (!existingArtist) {
          // If artist doesn't exist, create a new artist
          existingArtist = await Artist.create({ name: artist });
        }
        const event = new Event({
          _id: new mongoose.Types.ObjectId(),
          name: eventData.eventName,
          ticketCount: 40,
          image: `https://res.cloudinary.com/${cloud_name}/image/upload/${public_id}`, // Update this with the URL from your image upload
          ...eventData,
        });

        const newEvent = await event.save();
        res.json(newEvent);
      } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  ],
  sellTicket: async (req, res) => {
    try {
      const eventId = req.body.data._id;
      const ticketQuantity = req.body.data.ticketCount; // Default to reducing by 1 if not provided

      // Check if the event exists
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }

      // Ensure the reduction quantity is valid
      if (ticketQuantity < 0) {
        return res.status(400).json({ error: "Invalid reduction quantity" });
      }

      // Update ticket count based on the reduction quantity
      event.ticketCount = ticketQuantity;
      await event.save(); // Save the updated event

      res.json(event);
    } catch (error) {
      console.error("Hatali isler ytapiyorsun:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = { EventController };
