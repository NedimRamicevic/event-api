const { default: mongoose } = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    description: String,
    date: String,
    location: String,
    category: String,
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", EventSchema);

module.exports = { Event };
