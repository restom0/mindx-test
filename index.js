// Should allow for admin login, admin can see all of the Quiz Test of all users.
// Should allow users to sign up, login and create their all Quiz Test.
// Please refer to this interface to be able to design the API correctly <here>.
// Should allow for admin to create, read, update, delete Quiz Test.
// Should allow users public urls for each Quiz Test.

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./src/routes/user.route.js";
import QuizRouter from "./src/routes/quiz.route.js";
dotenv.config();

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use("/", UserRouter);
app.use("/quiz", QuizRouter);

mongoose.connect(process.env.MONGO_URL);

app.listen(port, () => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });
  console.log(`Listening on port ${port}`);
});
