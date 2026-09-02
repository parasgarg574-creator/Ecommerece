const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const AdminPublicRoutes = require("./Routes/Admin/Public/script")
const AdminProtectedRoutes = require("./Routes/Admin/Protected/script")
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public",AdminPublicRoutes);
app.use("/protected",AdminProtectedRoutes)
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
