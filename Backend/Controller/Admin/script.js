const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Admin = require("../../Modles/Admin/index");
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
    });
    const adminResponse = admin.toObject();
    delete adminResponse.password;
    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: adminResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    admin.lastLogin = new Date();
    await admin.save();
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const updateAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;

    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    if (name) admin.name = name;
    if (email) admin.email = email;
    await admin.save();
    const adminResponse = admin.toObject();
    delete adminResponse.password;
    return res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: adminResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdmin,
  deleteAdmin,
};
