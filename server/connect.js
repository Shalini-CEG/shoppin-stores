const express = require("express");
const mongoose = require("mongoose");
const uploadPost = require("./routes/uploadPost");
const registerUser = require("./routes/registerUser");
const profilePage = require("./routes/storesPage");
const cors = require("cors");

require("dotenv").config();

const app = express();
const db = mongoose.connection;
const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

// Data Parsing techniques

// app.use(bodyParser.json());
app.use(express.json({ limit: "5MB" }));
app.use(express.urlencoded({ extended: false }));

db.on("error", console.error.bind(console, "connection error:"));
db.on("connected", function () {
  console.log("MongoDB - connected successfully..");
});

// Routes
app.get("/", (req, res) => {
  res.send("Port is running...");
});

app.use("/posts", uploadPost);

app.use("/register", registerUser);

app.use("/profile", profilePage);

app.listen(3001, () => {
  console.log("Running on 3001");
});
