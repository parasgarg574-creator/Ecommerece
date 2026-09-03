const Category = require("../../Modles/Category/script");

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !req.file) {
            return res.status(400).json({
                success: false,
                message: "Please enter name and image",
            });
        }

        const existingCategory = await Category.findOne({
            name: name.trim(),
        });

        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: "Category already exists",
            });
        }

        const category = await Category.create({
            name: name.trim(),
            image: req.file.filename,
            description: description || "",
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (err) {
        console.error("Create Category Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
        });
    }
};

const getCategory = async (req, res) => {
    try {
        const categories = await Category.find().sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            message:
                categories.length > 0
                    ? "Categories fetched successfully"
                    : "No categories available",
            data: categories,
        });
    } catch (err) {
        console.error("Get Categories Error:", err);

        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
        });
    }
};

const getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category found",
            data: category,
        });
    } catch (err) {
        console.error("Get Single Category Error:", err);

        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID",
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updateData = {};

        if (name !== undefined) {
            updateData.name = name.trim();
        }

        if (description !== undefined) {
            updateData.description = description;
        }

        if (req.file) {
            updateData.image = req.file.buffer;
        }

        const category = await Category.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    } catch (err) {
        console.error("Update Category Error:", err);

        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID",
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: category,
        });
    } catch (err) {
        console.error("Delete Category Error:", err);

        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID",
            });
        }

        return res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
        });
    }
};
module.exports = {
    createCategory,
    getCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};