const { default: mongoose } = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    startDate: String,
    endDate: String,
    eventDate: String,
    eventHours: String,
    venue: String,
    city: String,
    category: String,
    ticketCount: Number,

    image: {
      filename: String,
      contentType: String,
      data: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", EventSchema);

module.exports = { Event };
