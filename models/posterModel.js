const mongoose = require("mongoose");
const smsPosterSchema = new mongoose.Schema({
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
smsPosterSchema.set("timestamps", true);
const smsPoster = mongoose.model("Smsposters", smsPosterSchema);
module.exports = smsPoster;
