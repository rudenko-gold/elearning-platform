const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const api_router = require("./api_router");

const app = express();

dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.CONNECT_STR,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

app.use(cors());
app.use(body_parser.json());
app.use("/api", api_router);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server up and running!");
});
