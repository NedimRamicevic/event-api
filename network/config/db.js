const { mongoose } = require("mongoose");

const MONGO_URI =
  "mongodb+srv://mrramicevic:1234@cluster0.dkckweg.mongodb.net/eventApp";

const env = {
  db: MONGO_URI,
};
const connectDB = async () => {
  try {
    await mongoose.connect(env.db);
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error.message);
    //Exit process with failure
  }
};

module.exports = connectDB;
