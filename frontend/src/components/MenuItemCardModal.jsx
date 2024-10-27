import React, { useEffect } from 'react'

const MenuItemCardModal = ({ item, isOpen, onClose }) => {
    if (!isOpen || !item) return null;

    const fullImageUrl = `http://localhost:5000/assets/${item.imageUrl}`;

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
    }

    const addToOrder = () => {
        console.log(`Update state to add ${item.name} to order`);
        console.log('If logged in, also send it to the database, else, just the app state and maybe a local storage variable');
    }

    return (
        <div
            onClick={handleOutsideClick}
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 modal-overlay"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-4 sm:p-6 relative">
                <div className='max-h-[85vh] overflow-y-auto'>
                    <button
                        onClick={onClose}
                        className="absolute top-1.5 right-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close Modal"
                    >
                        ✕
                    </button>

                    <img
                        className="w-full h-48 sm:h-56 object-cover rounded-lg shadow-gray-500 shadow-md"
                        src={fullImageUrl}
                        alt={`${item.name} Image`}
                    />

                    <div className="py-4 px-1 space-y-3">
                        <div>
                            <h1 className="text-xl font-bold text-mainBlack">{item.name}</h1>
                            <h1 className="text-sm text-mainRed flex">{item.featured ? 'Featured' : ''}</h1>
                        </div>
                        <div className='max-h-[20vh] overflow-y-auto space-y-3'>
                            <p className="text-mainDarkGray text-sm">{item.description}</p>
                            <div className='text-gray-500 text-sm'>
                                <p>Ingredients:</p>
                                <p>{item.ingredients}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            {item.salePrice > 0 ? (
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-500 line-through">${item.price.toFixed(2)}</span>
                                    <span className="text-red-500">${item.salePrice.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-red-500">${item.price.toFixed(2)}</span>
                            )}
                            <p className="text-mainDarkGray text-sm">Ready in {item.prepTime} min</p>
                        </div>
                    </div>
                </div>

                <div>
                    {item.availability ? (
                        <div onClick={addToOrder} className='flex justify-center p-2 group hover:cursor-pointer bg-mainYellow hover:bg-yellow-500 rounded-lg shadow-gray-300 shadow-md'>
                            <p
                                className='text-center cursor-pointer font-bold tracking-wider transition-all duration-300 text-mainBlack'
                            >Add to Cart</p>
                        </div>
                    ) : (
                        <div className="text-center py-3 text-red-500 font-bold text-lg">Sold Out</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MenuItemCardModal
