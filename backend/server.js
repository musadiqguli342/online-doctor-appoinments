const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const admindashboard = require("./routes/admindashboard");
const adminRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();
connectDB();

const app = express();


// ✅ CORS CONFIG (important for Netlify frontend)
app.use(
  cors({
    origin: "*", // production me Netlify URL dal sakti ho
    credentials: true,
  })
);

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));


// ✅ Routes
app.use("/api/auth", authRoutes); app.use('/api/doctors', doctorRoutes); app.use("/api/appointments", appointmentRoutes); app.use("/api/admin/dashboard", admindashboard); app.use('/api/admin', adminRoutes); app.use("/api/reviews", reviewRoutes); app.use("/api/user", userRoutes); app.use("/api/chat", chatRoutes);


// ✅ Root route (health check for Render)
app.get("/", (req, res) => {
  res.send("API is running...");
});


// ✅ Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
