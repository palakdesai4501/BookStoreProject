import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
//Option 1: Allow All Origins With Default of cors(*)
// app.use(cors());

//Option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to MERN Stack Tutorial");
});

app.use("/books", booksRoute);

mongoose.connect("mongodb://127.0.0.1:27017/book_store", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.listen(PORT, () => {
  console.log("Server is listening....");
});
