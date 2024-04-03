const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5500;

app.use(bodyParser.json());
app.use(cors());

const mongoURI =
  "mongodb+srv://admin:admin@cluster0.yntaf1q.mongodb.net/carservice?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
