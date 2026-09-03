    const categoryRoutes = require("../../Controller/Category/script");
    const express = require('express');
    const router = express.Router();
    const upload = require("../../Middleware/upload/script");
    router.post("/addcategory", upload.single("image"), categoryRoutes.createCategory);
    router.get("/getcategory",categoryRoutes.getCategory);
    router.get("/getSingle/:id",categoryRoutes.getSingleCategory);
    router.put("/updateCategory/:id",upload.single("image"),categoryRoutes.updateCategory);
    router.delete("/deleteCategory/:id",categoryRoutes.deleteCategory);
    module.exports = router