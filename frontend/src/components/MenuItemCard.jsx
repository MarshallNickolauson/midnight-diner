import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { useUpdateCartMutation } from '../features/cart/cartApiSlice';

const MenuItemCard = ({ menuItem, onReadMore, onEdit }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateCart, { isLoading }] = useUpdateCartMutation();

    const [isScaling, setIsScaling] = useState(false);

    if (!menuItem) return null;

    const {
        _id,
        name,
        description,
        price,
        salePrice,
        availability,
        prepTime,
        imageUrl,
    } = menuItem;

    const fullImageUrl = `http://localhost:8080/images/${String(imageUrl).replace('/data', '')}`;

    const addToOrder = () => {
        setIsScaling(true);
        dispatch(addItemToCart(menuItem));
        if (userInfo) {
            updateCart({ menuItemId: _id, action: 'add' });
        }
        setTimeout(() => setIsScaling(false), 200);
    }

    return (
        <div
            className={`bg-gray-50 rounded-lg overflow-hidden shadow-gray-400 shadow-lg w-60 transition-transform duration-200 ${isScaling ? 'scale-[1.03]' : 'scale-100'
                }`}
        >
            <div>
                <img className="w-full h-52 object-cover" src={fullImageUrl} alt={`${name} Image`} />
                <div className="p-2">
                    <h1 className="text-md font-bold text-mainBlack">{name}</h1>
                    <div className='text-sm space-y-1 py-1'>
                        <p className="text-mainDarkGray line-clamp-2 min-h-[6vh]">{description}</p>
                        <div className='flex justify-between'>
                            <p onClick={() => onReadMore(menuItem)} className='inline-block text-blue-500 cursor-pointer hover:underline'>Read More</p>
                            <p onClick={() => onEdit(menuItem)} className='inline-block text-blue-500 cursor-pointer hover:underline'>Edit</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            {salePrice > 0 ? (
                                <div className='flex flex-row space-x-1'>
                                    <p className='text-mainRed line-through'>${price.toFixed(2)}</p>
                                    <p className='text-mainRed'>${salePrice.toFixed(2)}</p>
                                </div>
                            ) : (
                                <p className='text-mainRed'>${price.toFixed(2)}</p>
                            )}
                            <p className='text-gray-600 flex float-right'>Ready in {prepTime} min</p>
                        </div>
                    </div>
                </div>
            </div>
            {availability ? (
                <div onClick={addToOrder} className='flex justify-center p-2 group hover:cursor-pointer bg-mainYellow hover:bg-yellow-500 transition-all duration-150'>
                    <p
                        className='text-center cursor-pointer font-bold tracking-wider transition-all duration-300 text-mainBlack'
                    >Add to Cart</p>
                </div>
            ) : (
                <div className='flex justify-center pb-2'>
                    <p className='text-center text-mainRed font-bold text-lg tracking-wider'>Sold Out</p>
                </div>
            )}
        </div>
    )
}

export default MenuItemCard
