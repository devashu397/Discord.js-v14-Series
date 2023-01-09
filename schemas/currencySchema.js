const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  guildId: {
    type: String,
    required: true,
  },

  wallet: {
    type: Number,
    default: 1000,
  },

  bank: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("currencycollection", schema);
