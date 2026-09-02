const express = require("express");
const Publicrouter = express.Router();
const { registerAdmin, loginAdmin,} = require("../../../Controller/Admin/script");
const authMiddleware = require("../../../Middleware/AuthMiddleware/script");
Publicrouter.post("/register", registerAdmin);
Publicrouter.post("/login", loginAdmin);
module.exports = Publicrouter