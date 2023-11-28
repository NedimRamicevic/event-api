const { Artist } = require("../models/Artist");

const ArtistController = {
  getAll: async (req, res) => {
    try {
      const artists = await Artist.find();
      res.json(artists);
    } catch (error) {
      console.log(error);
    }
  },

  getByName: async (req, res) => {
    try {
      const artist = await Artist.findOne({ name: req.params.name });
      res.json(artist);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = { ArtistController };
