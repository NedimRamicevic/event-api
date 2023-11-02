const { Event } = require("../models/Event.js");
const { Category } = require("../models/Category.js");
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
  createEvent: async (req, res) => {
    try {
      const event = new Event({
        image: req.body.image,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        category: req.body.category,
      });
      const newEvent = await event.save();
      res.json(newEvent);
    } catch (error) {
      console.log(error);
    }
  },
  add: async (req, res) => {
    try {
      const event = new Event({
        image: req.body.image,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        category: req.body.category,
      });
      const newEvent = await event.save();
      res.json(newEvent);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = { EventController };
