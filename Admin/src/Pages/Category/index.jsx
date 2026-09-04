import { useEffect, useState } from "react";
import AddEditCategory from "./AddEdit";
import apimethods from "../../Methods/ApiClient";
import Table from "../../Components/Table";

const Category = () => {
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    
      const response = await apimethods.getApi("/getcategory");
      setCategories(response?.data?.data || response?.data || response || []);
    
  };

  useEffect(() => {
    getCategories();
  }, []);

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "image",
      label: "Image",
    },
  ];

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold text-[#333] sm:text-[22px]">
          Category
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="h-[36px] w-full rounded-[6px] bg-[#00491B] px-4 text-[12px] font-semibold text-white transition hover:bg-[#019D3E] sm:w-auto"
        >
          Add Category
        </button>
      </div>

      {showForm ? (
        <AddEditCategory
          setShowForm={setShowForm}
          setCategories={setCategories}
        />
      ) : (
        <Table
          columns={columns}
          data={categories}
          emptyMessage="No categories found"
        />
      )}
    </>
  );
};

export default Category;
