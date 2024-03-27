const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();

const app = express();
app.use(cors({origin: true}));

// Import your routes
const postRoutes = require("./routes/post");

// Mount routes
app.use("/api/posts", postRoutes);

exports.api = functions.https.onRequest(app);
