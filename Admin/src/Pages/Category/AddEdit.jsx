import React, { useState } from "react";
import apimethods from "../../Methods/ApiClient";
import Swal from "sweetalert2";
import Table from "../../Components/Table";
import ImageUpload from "../../Common/ImageUpload/image";
const AddEdit = ({ showForm, setShowForm }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
    });
    const [staffList, setStaffList] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleImageChange = (file) => {
        setFormData((prev) => ({
            ...prev,
            image: file,
        }));
    };
    const columns = [
        {
            key: "name",
            label: "Name",
        },
        {
            key: "email",
            label: "Email",
        },
        {
            key: "image",
            label: "Image",
        },
    ];
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = new FormData();

        data.append("name", formData.name);
        data.append("description", formData.description);

        if (formData.image) {
            data.append("image", formData.image);
        }

        const response = await apimethods.postApi(
            "/addcategory",
            data
        );

        console.log("Category added successfully:", response);

        const newCategory = response?.data?.data || response?.data;

        setStaffList((prev) => [...prev, newCategory]);

        Swal.fire({
            title: "Category Added Successfully",
            icon: "success"
        });

        setFormData({
            name: "",
            description: "",
            image: null
        });

        setShowForm(false);

    } catch (error) {
        console.log("Failed to add category:", error);

        Swal.fire({
            title: "Failed to Add Category",
            text:
                error?.response?.data?.message ||
                "Something went wrong",
            icon: "error"
        });
    }
};
    return (
        <div className="min-h-screen">
            {!showForm && (
                <div className="rounded-xl bg-white p-4 shadow-sm">
                    <Table columns={columns} data={staffList} emptyMessage="No categories found"
                    />
                </div>
            )}

            {showForm && (
                <div className="flex items-center justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md rounded-2xl border border-green-100 bg-white p-8 shadow-lg"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-green-700">
                                Add Category
                            </h2>

                            <button type="button" onClick={() => setShowForm(false)} className="text-xl text-gray-500 hover:text-red-500"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" required className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>

                            <input id="description" type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Enter description" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <ImageUpload onChange={handleImageChange} label="Upload Category Image" accept="image/*" multiple={false} required={true}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-green-600 py-2.5 font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 active:bg-green-800"
                        >
                            Submit
                        </button>

                    </form>
                </div>
            )}
        </div>
    );
};

export default AddEdit;
