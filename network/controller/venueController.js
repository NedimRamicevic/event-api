//venue controller

const { Venue } = require("../models/Venue");

const VenueController = {
  getAll: async (req, res) => {
    try {
      const venues = await Venue.find();
      res.json(venues);
    } catch (error) {
      console.log(error);
    }
  },

  getByName: async (req, res) => {
    try {
      const venue = await Venue.findOne({ name: req.params.name });
      res.json(venue);
    } catch (error) {
      console.log(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      res.json(event);
    } catch (error) {
      console.log(error);
    }
  },
  add: async (req, res) => {
    try {
      const venue = new Venue({
        name: req.body.name,
        city: req.body.city,
      });
      const newVenue = await venue.save();
      res.json(newVenue);
    } catch (error) {
      console.log(error);
    }
  },
};
