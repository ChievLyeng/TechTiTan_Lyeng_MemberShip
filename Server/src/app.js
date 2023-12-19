const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

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
app.use(express.urlencoded({extended: true}))


module.exports = app;


