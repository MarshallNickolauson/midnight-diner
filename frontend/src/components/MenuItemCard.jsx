import React from 'react'
import { useNavigate } from 'react-router-dom';

const MenuItemCard = ({ menuItem }) => {

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

    const fullImageUrl = `http://localhost:5000/assets/${imageUrl}`;

    const navigate = useNavigate();

    const navigateToItem = () => {
        navigate(`/menu/item/${_id}`);
    }

    const addToOrder = () => {
        console.log(`Update state to add ${name} to order`);
        console.log('If logged in, also send it to the database, else, just the app state and maybe a local storage variable');
    }

    return (
        <div>
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-xl w-60">
                <div>
                    <img className="w-full h-52 object-cover" src={fullImageUrl} alt={`${name} Image`} />
                    <div className="p-2">
                        <h1 className="text-md font-bold text-mainBlack">{name}</h1>
                        <div className='text-sm space-y-1 py-1'>
                            <p className="text-mainDarkGray line-clamp-2">{description}</p>
                            <p onClick={navigateToItem} className='inline-block text-blue-500 cursor-pointer hover:underline'>Read More</p>
                            <div className='flex flex-row justify-between'>
                                {salePrice > 0 ? (
                                    <div className='flex flex-row space-x-1'>
                                        <p className='text-mainRed line-through'>${price.toFixed(2)}</p>
                                        <p className='text-mainRed'>${salePrice.toFixed(2)}</p>
                                    </div>
                                ) : (
                                    <p className='text-mainRed'>${price.toFixed(2)}</p>
                                )}
                                <p className='text-mainDarkGray flex float-right'>Ready in {prepTime}min</p>
                            </div>
                        </div>
                    </div>
                </div>
                {availability ? (
                    <div onClick={addToOrder} className='flex justify-center p-2 bg-mainBlack group hover:cursor-pointer'>
                        <p className='text-center text-mainYellow cursor-pointer font-bold tracking-wider group-hover:underline transition-all duration-300'>Add to Cart</p>
                    </div>
                ) : (
                    <div className='flex justify-center pb-2'>
                        <p className='text-center text-mainRed font-bold text-lg tracking-wider'>Sold Out</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MenuItemCard
