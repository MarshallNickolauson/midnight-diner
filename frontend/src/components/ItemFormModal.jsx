import { useEffect, useState } from "react";
import { useAddMenuItemMutation, useDeleteMenuItemMutation, useUpdateMenuItemMutation } from "../features/menu/menuApiSlice";
import { ClipLoader } from "react-spinners";

const ItemFormModal = ({ isOpen, onClose, item = null }) => {
  const [addMenuItem, { isLoading: isAdding }] = useAddMenuItemMutation();
  const [updateMenuItem, { isLoading: isUpdating }] = useUpdateMenuItemMutation();
  const [deleteMenuItem, { isLoading: isDeleting }] = useDeleteMenuItemMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    category: "",
    ingredients: "",
    imageUrl: "",
    availability: true,
    prepTime: "",
    featured: false,
  });

  useEffect(() => {
    if (item) {
      setFormData({ ...formData, ...item });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        salePrice: "",
        category: "",
        ingredients: "",
        imageUrl: "",
        availability: true,
        prepTime: "",
        featured: false,
      });
    }
  }, [item, isOpen]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!item) {
        await addMenuItem(formData).unwrap();
      } else {
        await updateMenuItem({ _id: item._id, ...formData }).unwrap();
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMenuItem({ _id: item._id }).unwrap();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const fields = [
    { id: "name", label: "Name", type: "text", placeholder: "Name", required: true },
    { id: "description", label: "Description", type: "text", placeholder: "Description", required: true },
    { id: "price", label: "Price", type: "number", placeholder: "Price", min: "0", step: "0.01", required: true },
    { id: "salePrice", label: "Sale Price", type: "number", placeholder: "Sale Price", min: "0", step: "0.01" },
    { id: "category", label: "Category", type: "text", placeholder: "Category", required: true },
    { id: "ingredients", label: "Ingredients", type: "text", placeholder: "Ingredients" },
    { id: "imageUrl", label: "Image URL", type: "text", placeholder: "Image URL" },
    { id: "prepTime", label: "Prep Time (min)", type: "number", placeholder: "Whole Number", min: "0", required: true },
  ];

  return (
    <div onClick={handleOutsideClick} className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 modal-overlay">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6 max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-mainBlack">
          {item ? "Edit Menu Item" : "Add New Menu Item"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ id, label, type, ...rest }) => (
            <div key={id} className="flex items-center space-x-2">
              <label htmlFor={id} className="w-1/3 text-gray-700">{label}:</label>
              <input
                id={id}
                type={type}
                value={formData[id]}
                onChange={handleChange}
                className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...rest}
              />
            </div>
          ))}

          {/* Checkboxes */}
          <div className="flex items-center space-x-2">
            <label htmlFor="availability" className="w-1/3 text-gray-700">Available:</label>
            <input
              type="checkbox"
              id="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="featured" className="w-1/3 text-gray-700">Featured:</label>
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-5 w-5"
            />
          </div>

          <div className="flex justify-end space-x-2">
            {(isAdding || isUpdating || isDeleting) && <ClipLoader color="#36d7b7" size={40} />}
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-mainBlack rounded hover:bg-gray-400 w-24">
              Cancel
            </button>
            {item && (
              <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-500 text-mainBlack rounded hover:bg-red-600 w-24">
                Delete
              </button>
            )}
            <button type="submit" className="px-4 py-2 bg-mainYellow text-mainBlack rounded hover:bg-yellow-500 w-24">
              {item ? "Save" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemFormModal;
