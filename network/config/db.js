const { mongoose } = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const env = {
  db: MONGO_URL,
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
