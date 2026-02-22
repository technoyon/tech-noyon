import express from "express";
import { addFood, listFood, removeFood, updateFood, changeOrder } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Allow request to continue even without file upload
foodRouter.post("/add", upload.single("image"), (req, res, next) => { next(); }, addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/update", upload.single("image"), (req, res, next) => { next(); }, updateFood);

// NEW route
foodRouter.post("/change-order", changeOrder);

export default foodRouter;