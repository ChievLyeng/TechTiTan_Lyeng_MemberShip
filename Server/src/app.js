const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./routes/userRoute");
const AppError = require("./utils/appError")
const GlobalErrorHandler = require("./middlewares/globalErrorHandler")

//app
const app = express();

// for sending cookie to frontend
const corsConfig = {
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
  };

// middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }))
app.use(GlobalErrorHandler)

// user route
app.use("/api/v1/users", userRoute);

// handle wrong route
app.all("*", (req,res,next) => {
  next( new AppError(`Can't find ${req.originalUrl} on this server!`,404));
})


module.exports = app;