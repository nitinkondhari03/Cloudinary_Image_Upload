// routes/UserRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const User = require("../model/User");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/users", upload.single("image"), async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let imageUrl = "";

    if (req.file) {
      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            imageUrl = result.secure_url;
            resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      imageUrl,
    });

    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
