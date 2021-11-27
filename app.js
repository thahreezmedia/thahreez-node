const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const smsPoster = require("./models/posterModel");
const chsPoster = require("./models/chsPosterModel");
const Chs = require("./models/chsModel");
const Sms = require("./models/candidateModel");

const app = express();
dotenv.config();
app.use(morgan("dev"));
app.use(bodyParser.json());

const corsOptions1 = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions1));

// mongo connection
mongoose.connect(process.env.MONGO_URI, (err, connection) => {
  if (err) {
    console.log("DB connection error", err);
  } else {
    console.log(`DB connected`);
  }
});
app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/poster/sms", async (req, res) => {
  try {
    let poster = await smsPoster.create({
      name: req.body.name,
      image: req.body.image,
      team: req.body.team,
      first: {
        name: req.body.firstName,
        grade: req.body.firstGrade,
        team: req.body.firstTeam,
        chestNo: req.body.firstChestNo,
        adm: req.body.firstAdm,
      },
      second: {
        name: req.body.secondName,
        grade: req.body.secondGrade,
        team: req.body.secondTeam,
        chestNo: req.body.secondChestNo,
        adm: req.body.secondAdm,
      },
      third: {
        name: req.body.thirdName,
        grade: req.body.thirdGrade,
        team: req.body.thirdTeam,
        chestNo: req.body.thirdChestNo,
        adm: req.body.thirdAdm,
      },
    });
    res.status(200).json(poster);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
app.post("/poster/chs", async (req, res) => {
  try {
    let poster = await chsPoster.create({
      name: req.body.name,
      image: req.body.image,
      team: req.body.team,
      first: {
        name: req.body.firstName,
        grade: req.body.firstGrade,
        team: req.body.firstTeam,
        chestNo: req.body.firstChestNo,
        image: req.body.firstImage,
        adm: req.body.firstAdm,
      },
      second: {
        name: req.body.secondName,
        grade: req.body.secondGrade,
        team: req.body.secondTeam,
        chestNo: req.body.secondChestNo,
        image: req.body.secondImage,
        adm: req.body.secondAdm,
      },
      third: {
        name: req.body.thirdName,
        grade: req.body.thirdGrade,
        team: req.body.thirdTeam,
        chestNo: req.body.thirdChestNo,
        image: req.body.thirdImage,
        adm: req.body.thirdAdm,
      },
    });

    res.status(200).json(poster);
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/candidate/sms/:chestNo", async (req, res) => {
  try {
    let data = await Sms.findOne({ chestNo: req.params.chestNo });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
app.get("/candidate/chs/:chestNo", async (req, res) => {
  try {
    let data = await Chs.findOne({ adm: req.params.chestNo });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/candidate/sms/:id", async (req, res) => {
  try {
    let data = await smsPoster.findById(req.params.id);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
app.get("/candidate/chs/:id", async (req, res) => {
  try {
    let data = await smsPoster.findById(req.params.id);
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/poster/sms/all", async (req, res) => {
  try {
    let posters = await smsPoster.find().sort({ createdAt: -1 }).limit(40);
    res.status(200).json({
      results: posters.length,
      posters,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/poster/chs/all", async (req, res) => {
  try {
    let posters = await chsPoster.find().sort({ createdAt: -1 });
    res.status(200).json({
      results: posters.length,
      posters,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/poster/sms/", async (req, res) => {
  try {
    let posters = await smsPoster.find().sort({ createdAt: -1 }).limit(40);
    res.status(200).json({
      results: posters.length,
      posters,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/poster/chs/", async (req, res) => {
  try {
    let posters = await chsPoster.find().sort({ createdAt: -1 }).limit(40);
    res.status(200).json({
      results: posters.length,
      posters,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.delete("/poster/sms/:id", async (req, res) => {
  try {
    await smsPoster.findByIdAndDelete(req.params.id);
    res.status(200).json({
      result: "deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.delete("/poster/chs/:id", async (req, res) => {
  try {
    await chsPoster.findByIdAndDelete(req.params.id);
    res.status(200).json({
      result: "deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/poster/sms/:id", async (req, res) => {
  try {
    let data = await smsPoster.findById(req.params.id);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.get("/poster/chs/:id", async (req, res) => {
  try {
    let data = await chsPoster.findById(req.params.id);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.patch("/poster/sms/:id", async (req, res) => {
  try {
    let data = await smsPoster.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "first.adm": req.body.firstAdm,
          "second.adm": req.body.secondAdm,
          "third.adm": req.body.thirdAdm,
        },
      },
      { new: true }
    );
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
app.patch("/poster/chs/:id", async (req, res) => {
  try {
    let data = await chsPoster.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "first.adm": req.body.firstAdm,
          "second.adm": req.body.secondAdm,
          "third.adm": req.body.thirdAdm,
        },
      },
      { new: true }
    );
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
