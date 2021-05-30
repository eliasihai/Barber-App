const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  barberID: {
    type: String,
    required: false,
    unique: false,
  },
  userID: {
    type: String,
    required: false,
    unique: false,
  },
  barberName: {
    type: String,
    required: true,
    unique: false,
  },
  userName: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    unique: false,
  },
  end: {
    type: Date,
    unique: false,
  },
});

module.exports = mongoose.model("Events", eventsSchema);
