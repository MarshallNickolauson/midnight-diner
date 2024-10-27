import { useEffect, useState } from "react";
import { useAddMenuItemMutation, useDeleteMenuItemMutation, useUpdateMenuItemMutation } from "../features/menu/menuApiSlice";

const ItemFormModal = ({ isOpen, onClose, item = null }) => {
    const [addMenuItem] = useAddMenuItemMutation();
    const [updateMenuItem] = useUpdateMenuItemMutation();
    const [deleteMenuItem] = useDeleteMenuItemMutation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [category, setCategory] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [availability, setAvailability] = useState(true);
    const [prepTime, setPrepTime] = useState('');
    const [featured, setFeatured] = useState(false);

    useEffect(() => {
        if (item) {
            setName(item.name || '');
            setDescription(item.description || '');
            setPrice(item.price || '');
            setSalePrice(item.salePrice || '');
            setCategory(item.category || '');
            setIngredients(item.ingredients || '');
            setImageUrl(item.imageUrl || '');
            setAvailability(item.availability || false);
            setPrepTime(item.prepTime || '');
            setFeatured(item.featured || false);
        }
    }, [item]);

    const handleSubmit
        = async (e) => {
            e.preventDefault();

            const formData = {
                name,
                description,
                price,
                salePrice,
                category,
                ingredients,
                imageUrl,
                availability,
                prepTime,
                featured,
            };

            console.log('Submitting form data:', formData);

            try {
                if (!item) {
                    await addMenuItem(formData).unwrap();
                } else {
                    await updateMenuItem({ _id: item._id, ...formData }).unwrap();
                }
                onClose(); // Close the modal only after the item has been added/updated successfully
            } catch (error) {
                console.error(error);
                // Optionally handle error state (e.g., show a notification)
            }
        };

    const handleDelete = async () => {
        try {
            await deleteMenuItem({ _id: item._id }).unwrap();
            onClose();
        } catch (error) {
            console.log(error);
            onClose();
        }
    }

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

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={handleOutsideClick}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 modal-overlay">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6 max-h-[85vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-mainBlack">
                    {item ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="name" className="w-1/3 text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            required
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="description" className="w-1/3 text-gray-700">Description:</label>
                        <input
                            type="text"
                            id="description"
                            required
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="price" className="w-1/3 text-gray-700">Price:</label>
                        <input
                            type="number"
                            id="price"
                            required
                            placeholder="Price"
                            min="0"
                            step="0.01"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Sale Price Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="salePrice" className="w-1/3 text-gray-700">Sale Price:</label>
                        <input
                            type="number"
                            id="salePrice"
                            placeholder="Sale Price (not required)"
                            min="0"
                            step="0.01"
                            onChange={(e) => setSalePrice(e.target.value)}
                            value={salePrice}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="category" className="w-1/3 text-gray-700">Category:</label>
                        <input
                            type="text"
                            id="category"
                            required
                            placeholder="Category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Ingredients Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="ingredients" className="w-1/3 text-gray-700">Ingredients:</label>
                        <input
                            type="text"
                            id="ingredients"
                            placeholder="Ingredients"
                            onChange={(e) => setIngredients(e.target.value)}
                            value={ingredients}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Image URL Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="imageUrl" className="w-1/3 text-gray-700">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            placeholder="image url"
                            onChange={(e) => setImageUrl(e.target.value)}
                            value={imageUrl}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Prep Time Field */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="prepTime" className="w-1/3 text-gray-700">Prep Time (min):</label>
                        <input
                            type="number"
                            id="prepTime"
                            required
                            placeholder="Whole Number"
                            min="0"
                            onChange={(e) => setPrepTime(e.target.value)}
                            value={prepTime}
                            className="w-2/3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Availability Checkbox */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="availability" className="w-1/3 text-gray-700">Available:</label>
                        <input
                            type="checkbox"
                            id="availability"
                            checked={availability}
                            onChange={(e) => setAvailability(e.target.checked)}
                            className="h-5 w-5"
                        />
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center space-x-2">
                        <label htmlFor="featured" className="w-1/3 text-gray-700">Featured:</label>
                        <input
                            type="checkbox"
                            id="featured"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            className="h-5 w-5"
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-mainBlack rounded hover:bg-gray-400 w-24"
                        >
                            Cancel
                        </button>
                        {item && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-mainBlack rounded hover:bg-red-600 w-24"
                            >
                                Delete
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-mainYellow text-mainBlack rounded hover:bg-yellow-500 w-24"
                        >
                            {item ? 'Save' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemFormModal;
