"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const port = process.env.PORT || 4000;

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
.use(cors(
  {origin: "https://shufflr-five.vercel.app"}
))
.use(helmet())

.get("/users/:user", getUserInfo)
.get("/collections/:user", getUserCollections) 
.get("/cards/:collection", getCardsFromCollection)
.get("/cards", getUserCards)

.post("/users", addUser)
.post("/addcollections/:user", addCollection)

.patch("/users/:user", updateUser)
.patch("/collections/:collection", updateCollection)
.patch("/review/:collectionId", updateReviewCard)

.delete("/collections/:collection", deleteCollection)

.get("*", (req, res) => {
    res.status(404).json({
        status: 400,
        message: "Something went wrong!",
    });
})

.listen(port, () => console.log(`Listening to port ${port}`));