"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: "https://shufflr-five.vercel.app",
};

// Handlers
const {
  getUserInfo,
  getUserCollections,
  getCardsFromCollection,
  addUser,
  addCollection,
  updateUser,
  updateCollection,
  getUserCards,
  deleteCollection,
  updateReviewCard,
} = require("./handlers")

express()
.use(morgan("tiny"))
.use(express.json())
.use(express.static("public"))
.use(cors(corsOptions))
.use(helmet())

.get("api/users/:user", getUserInfo)
.get("api/collections/:user", getUserCollections) 
.get("api/cards/:collection", getCardsFromCollection)
.get("api/cards", getUserCards)

.post("api/users", addUser)
.post("api/addcollections/:user", addCollection)

.patch("api/users/:user", updateUser)
.patch("api/collections/:collection", updateCollection)
.patch("api/review/:collectionId", updateReviewCard)

.delete("api/collections/:collection", deleteCollection)

.get("*", (req, res) => {
    res.status(404).json({
        status: 400,
        message: "Something went wrong!",
    });
})

.listen(port, () => console.log(`Listening to port ${port}`));