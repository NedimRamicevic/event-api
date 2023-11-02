const { default: mongoose } = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
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
