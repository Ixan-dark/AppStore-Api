import AppModel from "../Models/appModels";
import express from "express";
import { v2 as cloudinary } from "cloudinary";


const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// CREATE EVENT
router.post("/", async (req, res) => {
  try {
    const { 
      appName,
      slogan,
      ageRestriction,
      description,
      version,
      developer,
      size,
      rating,
      language,
      appBanner,
      appImage} = req.body;

    if (!appName || !slogan || !ageRestriction || !description || !version || !developer || !size || !rating || !language || !appBanner || !appImage) {
      return res.status(400).json({ message: "All fields must be provided" });
    }


    // Upload image to Cloudinary
    let appBannerUrl;
    let appImageUrl;
    try {
      const uploadBannerResponse = await cloudinary.uploader.upload(appBanner);
      appBannerUrl = uploadBannerResponse.secure_url;

      const uploadImageResponse = await cloudinary.uploader.upload(appImage);
      appImageUrl = uploadImageResponse.secure_url;

    } catch (cloudinaryError) {
      console.error("Cloudinary upload error:", cloudinaryError);
      return res.status(500).json({ message: "Image upload failed. Check your Cloudinary config." });
    }

    const newApp = new AppModel({
      name: appName,
      slogan,
      age: ageRestriction,
      description,
      version,
      developer,
      size,
      rating,
      language,
      appBanner: appBannerUrl,
      appImage: appImageUrl
    });

    await newApp.save();
    res.status(201).json(newApp);
  } catch (error) {
    console.error("Error creating App in server", error);
    res.status(500).json({ message: error.message });
  }
});


// Route to get all apps
router.get("/apps", async (req, res) => {
  try {
    const apps = await AppModel.find();
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// Route to get a single app by ID
router.get("/apps/:id", async (req, res) => {
  try {
    const app = await AppModel.findById(req.params.id);
    if (!app) {
      return res.status(404).json({ message: "App not found" });
    }
    res.status(200).json(app);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;