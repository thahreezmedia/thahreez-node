const mongoose = require("mongoose");
const smsSchema = new mongoose.Schema({
  chestNo: String,
  name: String,
  team: String,
  adm: Number,
});
const Sms = mongoose.model("Sms", smsSchema);
module.exports = Sms;
