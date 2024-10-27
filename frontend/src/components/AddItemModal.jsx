import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AddItemModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        salePrice: '',
        category: '',
        ingredients: '',
        imageUrl: '',
        availability: true,
        prepTime: '',
        featured: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Added item', formData);
        onClose();
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6">
                <h2 className="text-2xl font-bold text-center text-mainBlack">Add New Menu Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="name" className="w-1/3 text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder="Name"
                            onChange={handleChange}
                            value={formData.name}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="description" className="w-1/3 text-gray-700">Description:</label>
                        <input
                            type="text"
                            name="description"
                            id="description"
                            required
                            placeholder="Description"
                            onChange={handleChange}
                            value={formData.description}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="price" className="w-1/3 text-gray-700">Price:</label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            required
                            placeholder="Price"
                            min="0"
                            step="0.01"
                            onChange={handleChange}
                            value={formData.price}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Sale Price Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="salePrice" className="w-1/3 text-gray-700">Sale Price:</label>
                        <input
                            type="number"
                            name="salePrice"
                            id="salePrice"
                            placeholder="Sale Price (not required)"
                            min="0"
                            step="0.01"
                            onChange={handleChange}
                            value={formData.salePrice}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="category" className="w-1/3 text-gray-700">Category:</label>
                        <input
                            type="text"
                            name="category"
                            id="category"
                            required
                            placeholder="Category"
                            onChange={handleChange}
                            value={formData.category}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Ingredients Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="ingredients" className="w-1/3 text-gray-700">Ingredients:</label>
                        <input
                            type="text"
                            name="ingredients"
                            id="ingredients"
                            placeholder="Ingredients"
                            onChange={handleChange}
                            value={formData.ingredients}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Image URL Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="imageUrl" className="w-1/3 text-gray-700">Image URL:</label>
                        <input
                            type="text"
                            name="imageUrl"
                            id="imageUrl"
                            placeholder="image url"
                            onChange={handleChange}
                            value={formData.imageUrl}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Prep Time Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="prepTime" className="w-1/3 text-gray-700">Prep Time (min):</label>
                        <input
                            type="number"
                            name="prepTime"
                            id="prepTime"
                            required
                            placeholder="Whole Number"
                            min="0"
                            onChange={handleChange}
                            value={formData.prepTime}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Availability Checkbox */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="availability" className="w-1/3 text-gray-700">Available:</label>
                        <input
                            type="checkbox"
                            name="availability"
                            id="availability"
                            checked={formData.availability}
                            onChange={handleChange}
                            className="h-5 w-5"
                        />
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="featured" className="w-1/3 text-gray-700">Featured:</label>
                        <input
                            type="checkbox"
                            name="featured"
                            id="featured"
                            checked={formData.featured}
                            onChange={handleChange}
                            className="h-5 w-5"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-mainYellow text-mainBlack rounded hover:bg-yellow-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;
