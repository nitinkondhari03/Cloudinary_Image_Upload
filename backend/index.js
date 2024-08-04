const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParder = require("body-parser");
const { v2: cloudinary } = require("cloudinary");
const UserRoutes = require("./routes/UserRoutes");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParder.json());
app.use(bodyParder.urlencoded({ extended: true }));
app.use(cors());
//Cloudinary Configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api", UserRoutes);
//MngoDB Configuration
async function ConnectDb(params) {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongoose connected");
  } catch (error) {
    console.log("DB Error");
  }
}

app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
  ConnectDb();
});
