const Staff = require("../../Modles/Staff/script");
const createStaff = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter name, email and password",
            });
        }
        const existingStaff = await Staff.findOne({ email });
        if (existingStaff) {
            return res.status(409).json({
                success: false,
                message: "Staff already exists",
            });
        }
        const staff = await Staff.create({
            name,
            email,
            password,
        });

        return res.status(201).json({
            success: true,
            message: "Staff created successfully",
            data: staff,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const getStaff = async (req, res) => {
    try {
        const staffs = await Staff.find();

        if (staffs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No staffs available",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Staffs fetched successfully",
            data: staffs,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const getSingleStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findById(id);

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Staff fetched successfully",
            data: staff,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, status } = req.body;
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found",
            });
        }
        staff.name = name || staff.name;
        staff.email = email || staff.email;
        staff.password = password || staff.password;
        staff.role = role || staff.role;
        staff.status = status !== undefined ? status : staff.status;
        await staff.save();
        return res.status(200).json({
            success: true,
            message: "Staff updated successfully",
            data: staff,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found",
            });
        }
        await Staff.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Staff deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    createStaff,
    getStaff,
    getSingleStaff,
    updateStaff,
    deleteStaff,
};