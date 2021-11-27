const mongoose = require("mongoose");
const chsPosterSchema = new mongoose.Schema({
  image: String,
  name: String,
  first: {
    name: String,
    grade: String,
    team: String,
    chestNo: String,
    adm: String,
  },
  second: {
    name: String,
    grade: String,
    team: String,
    chestNo: String,
    adm: String,
  },
  third: {
    name: String,
    grade: String,
    team: String,
    chestNo: String,
    adm: String,
  },
});
chsPosterSchema.set('timestamps', true);
const chsPoster = mongoose.model("Chsposters", chsPosterSchema);
module.exports = chsPoster;
