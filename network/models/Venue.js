//venue model

const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema(
  {
    name: String,
    city: String,
  },
  {
    timestamps: true,
  }
);

const Venue = mongoose.model("venue", VenueSchema);

module.exports = { Venue };
