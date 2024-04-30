import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import { json } from "body-parser";

const app = express();
const port = 5173;

app.use(json());
app.use(cors());

const mongoURI =
  "mongodb+srv://admin:admin@cluster0.yntaf1q.mongodb.net/carservice?retryWrites=true&w=majority";
connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
