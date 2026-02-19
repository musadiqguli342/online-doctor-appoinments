const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");
const multer = require("multer");
const path = require("path");

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../public/uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Routes
router.get("/search", doctorController.searchDoctors);
router.get("/", doctorController.getAllDoctors);
router.post("/", upload.single("image"), doctorController.addDoctor);
router.get("/:id", doctorController.getDoctorById);
router.put("/:id", upload.single("image"), doctorController.updateDoctor);
router.delete("/:id", doctorController.deleteDoctor);


module.exports = router;
