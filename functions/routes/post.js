const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const path = require("path");
const os = require("os");
// const fs = require("fs");
const admin = require("firebase-admin");
const {uuid} = require("uuidv4"); // For unique image filenames
// const Busboy = require("busboy");
const multer = require("multer");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({origin: true}));

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(os.tmpdir(), "uploads")); // Temporary storage
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({storage});

// Post Route
app.post("/post", upload.single("image"), async (req, res) => {
  try {
    const {title, description} = req.body;

    if (!title || !description || !req.file) {
      return res.status(400).
          json({error: "Missing title, description, or image"});
    }

    // Upload image to Firebase Storage
    // Default bucket (set your actual bucket name if needed)
    const bucket = admin.storage().bucket();
    const imagePath = req.file.path;
    const originalFilename = req.file.originalname;
    const token = uuid();
    const metadata = {
      contentType: req.file.mimetype,
      firebaseStorageDownloadTokens: token,
    };
    const uploadTask = await bucket.upload(imagePath, {
      destination: `posts/${token}_${originalFilename}`,
      metadata,
    });
    const imageUrl = uploadTask[0].metadata.mediaLink; // Get public URL

    // Create post document in Firestore
    const newPostRef = db.collection("posts").doc();
    await newPostRef.set({
      title,
      description,
      imageUrl,
      createdAt: admin.firestore.Timestamp.now(),
      // username: currentUsername // Assuming 'currentUsername' holds the value
    });

    res.status(201).json({message: "Post created successfully!"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

exports.api = functions.https.onRequest(app);
