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
      const artist = new Artist({
        name: req.body.name,
      });
      const newArtist = await artist.save();
      res.json(newArtist);
    } catch (error) {
      console.log(error);
    }
  },
};
