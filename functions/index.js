const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();

const app = express();
app.use(cors({origin: true}));

// Import your routes
const postRoutes = require("./routes/post");
// const validateSignupData = require("./routes/validation");

// Mount routes
app.use("/api/posts", postRoutes);

exports.api = functions.https.onRequest(app);
