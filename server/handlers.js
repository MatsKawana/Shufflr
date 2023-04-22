"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const {MONGO_URI} = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// USERS ------------------------------------------------------------------------------------------------------------------------------------------------

// GET User Info
const getUserInfo = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const userEmail = req.params.user;

    try {
        await client.connect();
        const db = client.db("Shufflr");
        const data = await db.collection("users").find({"email": userEmail}).toArray()
        if (data.length === 0) {
            res.status(200).json({status: 200, data: {}, message: "No user found matching provided email"});
            client.close();
            return;
        }
        res.status(200).json({ status: 200, data: data, message: "User Found!"});
    } catch (err) {
        res.status(500).json({ status: 500, data: {}, message: err.message });
    }
    client.close();
}

// POST Add User
const addUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const id = uuidv4();
    const { email, name, nickname, picture, updated_at } = req.body;

   // Prequalify Submission
    if (!req.body.hasOwnProperty('email')
        || !req.body.hasOwnProperty('nickname')
        || !req.body.hasOwnProperty('name')
        || !req.body.hasOwnProperty('picture')
    ) {
        res.status(400).json({status: 400, data: req.body, message: "Submission must include keys of 'email', 'name', 'nickname', and 'picture'"})
        client.close();
        return;
    }

    try {
        await client.connect();
        const db = client.db("Shufflr");
        const userFound = await db.collection("users").findOne({ email: email });

        if (!userFound) {
            const data = await db.collection("users").insertOne({ _id: id, email: email, name: name, nickname: nickname, picture: picture});
            if (data.acknowledged === true) {
                res.status(201).json({ status: 201, data: data.insertedId, message: "New user successfully created"});
            }
            const collectionData = await db.collection("collections").insertOne({_id: id, collections: []});
        } else {
            res.status(400).json({status: 400, data: data, message: "The user already exists"});
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err });
    }
    client.close();
}

// PATCH Update User
const updateUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const { email, nickname, picture, name } = req.body;
    const id = req.params.user;

    // Prequalify Submission
    if (!req.body.hasOwnProperty('email')
        || !req.body.hasOwnProperty('nickname')
        || !req.body.hasOwnProperty('name')
        || !req.body.hasOwnProperty('picture')
    ) {
        res.status(400).json({status: 400, data: {}, message: "Submission must include keys of 'email', 'nickname', 'name' and 'picture'"})
        client.close();
        return;
    }
    
    try {
        await client.connect();
        const db = client.db("Shufflr");

        const currentUserInfo = await db.collection("users").find({ _id: id }).toArray();
        if (currentUserInfo === null) {
            res.status(400).json({status: 400, data: {}, message: "No user found. Try again!"});
            client.close();
            return;
        }

        const { email: prevEmail, nickname: prevNickname, name: prevName, picture: prevPicture } = currentUserInfo;
        
        if (email !== prevEmail) {
            const newEmail = { $set: { email: email }};
            const updateEmail = await db.collection("users").updateOne({_id: id}, newEmail);
            updateEmail.modifiedCount === 1 ? console.log('email updated') : console.log('email unchanged');
        }
        
        if (nickname !== prevNickname) {
            const newNickame = { $set: { nickname: nickname }};
            const updateNickname = await db.collection("users").updateOne({_id: id}, newNickame);
            updateNickname.modifiedCount === 1 ? console.log('nickname updated') : console.log('nickname unchanged');
        }

        if (name !== prevName) {
            const newName = { $set: { name: name }};
            const updatedName = await db.collection("users").updateOne({_id: id}, newName);
            updatedName.modifiedCount === 1 ? console.log('name updated') : console.log('name unchanged');
        }

        if (picture !== prevPicture) {
            const newPicture = { $set: { picture: picture }};
            const updatedPicture = await db.collection("users").updateOne({ _id: id}, newPicture);
            updatedPicture.modifiedCount === 1 ? console.log('picture updated') : console.log('picture unchanged');
        }
        
        res.status(200).json({status: 200, data: req.body, message: "Changes have been made!"})

    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
}

// COLLECTIONS ------------------------------------------------------------------------------------------------------------------------------------------------

// GET User's Collections
const getUserCollections = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const id = req.params.user;

    try {
        await client.connect();
        const db = client.db("Shufflr");
        const data = await db.collection("collections").findOne({_id: id});
        res.status(201).json({ status: 201, data: data.collections});
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
}

// GET All Cards from User
const getUserCards = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const collectionId = req.params.collection;
    console.log(req.params.collection);

    try {
        await client.connect();
        const db = client.db("Shufflr");
        const data = await db.collection("collections").find({});
        const allCards = [];
        await data.forEach(document => {
            allCards.push(...document.cards);
        });
        res.status(200).json({ status: 200, data: allCards, message: "Got it!"});

    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
}

// GET Cards from Collection
const getCardsFromCollection = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const collectionId = req.params.collection;

    try {
        await client.connect();
        const db = client.db("Shufflr");
        const object = await db.collection("collections").findOne({ "collections._id": collectionId }, { "collections.$": 1 });
        const data = object.collections.find(obj => obj._id === collectionId);
        if (!data) {
            res.status(201).json({ status: 201, data: data, message: "Collection not found. Try again!" });
            client.close();
            return;
        } else {
            res.status(200).json({ status: 200, data: data, message: "Collection found!"});
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
}
// POST Add Collection
const addCollection = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const userId = req.params.user;

    // Prequalify Submission
    // if (!req.body.data.hasOwnProperty('userId')
    //     || !req.body.data.hasOwnProperty('collectionName')
    //     || !req.body.data.hasOwnProperty('collectionDescription')
    //     || !req.body.data.hasOwnProperty('collectionCategory')
    //     || !req.body.data.hasOwnProperty('collectionColor')
    //     || !req.body.data.hasOwnProperty('cards')
    //     || !req.body.data.cards[0].hasOwnProperty('cardId')
    //     || !req.body.data.cards[0].hasOwnProperty('cardQuestion')
    //     || !req.body.data.cards[0].hasOwnProperty('cardAnswer')
    //     || !req.body.data.cards[0].hasOwnProperty('cardHint')
    //     || !req.body.data.cards[0].hasOwnProperty('cardTag')
    // ) {
    //     res.status(400).json({status: 400, data: {}, message: "Oops, something went wrong. Try again!"})
    //     client.close();
    //     return;
    // }
    
    try {
        await client.connect();
        const db = client.db("Shufflr");
        const data = await db.collection("collections").updateOne({_id: userId}, {$push: { collections: req.body.data }});
        if (data.modifiedCount === 1) {
            res.status(201).json({ status: 201, data: data, message: "Collection saved!"});
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: "Collection saved failed. Try again!" });
    }
    client.close();
}

// PATCH Update Collection
const updateCollection = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const collectionId = req.params.collection;
    const { collectionName, collectionDescription, collectionCategory, cards } = req.body.data;
    
    try {
        await client.connect();
        const db = client.db("Shufflr");

        const collectionInfo = await db.collection("collections").findOne({ "collections._id": collectionId });
        if (collectionInfo === null) {
            res.status(400).json({status: 400, data: {}, message: "No collection found. Try again!"});
            client.close();
            return;
        }
        const newCollection = req.body.data;
        const updateCollection = await db.collection("collections").updateOne(
            { _id: req.body.userId, "collections._id": collectionId },
            { $set: { 
                "collections.$.collectionName": collectionName,
                "collections.$.collectionDescription": collectionDescription,
                "collections.$.collectionCategory": collectionCategory,
                "collections.$.cards": cards 
                } 
            }
        );
        updateCollection.modifiedCount === 1 ? console.log('Collection updated') : console.log('Collection unchanged');
        res.status(200).json({status: 200, data: req.body, message: "Changes have been made!"})
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
}

// Update Card Review
const updateReviewCard = async (req, res) => {
    const collectionId = req.params.collectionId;
    const cardId = req.body.cardId;
    const reviewVal = req.body.review;
    const userId = req.body.userId;

    const client = new MongoClient(MONGO_URI, options);
    try {
        const filter = {
            _id: userId,
            "collections._id": collectionId,
            "collections.cards.cardId": cardId
          };
          
          const update = {
            $set: {
              "collections.$[outer].cards.$[inner].review": reviewVal
            }
          };
          
          const options = {
            arrayFilters: [
              { "outer._id": collectionId },
              { "inner.cardId": cardId }
            ]
          };
        await client.connect();
        const db = client.db("Shufflr");
        const cardInfo = await db.collection("collections").updateOne(filter, update, options);
        console.log(cardInfo);
        if (cardInfo === null) {
            res.status(400).json({status: 400, data: {}, message: "No collection found. Try again!"});
            client.close();
            return;
        }
        cardInfo.modifiedCount === 1 
            ? res.status(200).json({status: 200, data: req.body, message: "Changes have been made"})
            : res.status(200).json({status: 200, data: req.body, message: "No changes were made!"})

    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message})
    }
    client.close();
}

// DELETE Collection
const deleteCollection = async (req, res) => {
    const collectionId = req.params.collection;
    const userId = req.body.userId;
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("Shufflr");
        const data = await db.collection("collections").updateOne({_id: userId}, {$pull: {collections: {_id: collectionId}}});
        if (data.modifiedCount === 1) {
            res.status(201).json({status: 201, data: {}, message: "Collection deleted"})
        } else {
            res.status(201).json({status: 201, data: data, message: "Oops, something went wrong. Try again!"})
        }
    } catch (err) {
        res.status(500).json({ status: 500, data: req.body, message: err.message });
    }
    client.close();
}

module.exports = {
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
};