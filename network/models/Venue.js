//venue model

const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    city: String,
  },
  {
    timestamps: true,
  }
);

const Venue = mongoose.model("venue", VenueSchema);

module.exports = { Venue };
