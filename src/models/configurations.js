const mongoose = require("mongoose");
const configuration = new mongoose.Schema(
  {
    w: [],
    u: [],
    fa: [],
    numeroCapas: {
      type: Number,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);
const configurationModel = mongoose.model("configurations", configuration);
module.exports = { configurationModel };
