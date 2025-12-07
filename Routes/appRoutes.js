import AppModel from "../Models/appModels";
import express from "express";

const router = express.Router();

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