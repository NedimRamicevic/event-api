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
};

module.exports = { VenueController };
