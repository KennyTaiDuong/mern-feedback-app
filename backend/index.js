require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const feedbackRoutes = require("./routes/feedbacks");

// express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect to db
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db and listening on port`, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// routes
app.use("/api/feedback", feedbackRoutes);
