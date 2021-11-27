const mongoose = require("mongoose");
const chsSchema = new mongoose.Schema({
  chestNo: String,
  name: String,
  team: String,
  adm: Number,
});
const Chs = mongoose.model("Chs", chsSchema);
module.exports = Chs;
