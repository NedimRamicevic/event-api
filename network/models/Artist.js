// artist model

const { default: mongoose } = require("mongoose");

const ArtistSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model("artist", ArtistSchema);

module.exports = { Artist };
