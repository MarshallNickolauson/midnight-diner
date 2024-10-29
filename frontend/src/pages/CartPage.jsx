import React from 'react'
import BlackButtonHollow from '../components/BlackButtonHollow'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const menuItems = useSelector((state) => state.cart.menuItems);

    const fullImageUrl = `http://localhost:5000/assets/`;

    const totalPrice = menuItems.reduce((total, item) => {
        return total + (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity;
    }, 0).toFixed(2);

    const handlePlaceOrder = () => {
        console.log("Order placed!");
    };

    const addItem = () => {
        console.log('Add 1 item');
    }

    const removeItem = () => {
        console.log('Remove 1 item');
    }

    const deleteMenuItem = () => {
        console.log("Remove menu item");
    }

    return (
        <div className='bg-mainWhite py-3 min-h-screen pb-8'>
            <div className='text-center'>
                <h1 className='text-[3rem] text-mainBlack font-bold'>YOUR <span className='text-mainRed'>BAG</span></h1>
                <h1 className='text-[1.2rem]'>Here you'll see what you've added to your takeout bag.</h1>
                {!userInfo &&
                    <h1
                        onClick={() => navigate('/login')}
                        className='text-[1rem] mt-5 cursor-pointer inline-block text-blue-500 hover:underline'>
                        For the best experience, please sign in.
                    </h1>
                }
                <div className='flex justify-center mt-5'>
                    <BlackButtonHollow title='View Menu' navigateTo='/menu' width='160' />
                </div>
                <div className="flex flex-col items-center mt-5">
                    {menuItems.length > 0 ? (
                        menuItems.map((item) => (
                            <div key={item.id} className="flex flex-col md:flex-row bg-white shadow-gray-400 shadow-md rounded-lg p-4 m-2 w-3/4">
                                <img src={`${fullImageUrl}${item.imageUrl}`} alt={item.name} className="w-[145px] h-[145px] object-cover rounded-md md:mr-4 shadow-mainBlack shadow-md" />
                                <div className="flex flex-col justify-between space-y-3 w-full">

                                    <div className='flex flex-col justify-between h-full text-left'>
                                        <div className='flex flex-row justify-between'>
                                            <h2 className="text-xl font-bold text-mainBlack tracking-wide">{item.name}</h2>
                                            <FaTrashAlt size={18} className='cursor-pointer' color='#DA4569' onClick={deleteMenuItem} />
                                        </div>
                                        <p className="text-gray-600 line-clamp-1 text-left">{item.description}</p>
                                        <div>
                                            <p onClick={() => console.log('Read more button')} className='inline-block text-blue-500 cursor-pointer hover:underline'>Read More</p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold">
                                                {item.salePrice > 0 ? (
                                                    <>
                                                        <span className="text-mainRed">${item.salePrice.toFixed(2)}</span>
                                                        <span className="line-through text-gray-500 pl-2">${item.price.toFixed(2)}</span>
                                                    </>
                                                ) : (
                                                    <span className="text-mainRed">${item.price.toFixed(2)}</span>
                                                )}
                                            </span>
                                            <div className='flex flex-row space-x-3'>
                                                <FaMinus size={18} className='mt-[6px] cursor-pointer' onClick={removeItem} />
                                                <p className="text-mainDarkGray text-lg">Qty: {item.quantity}</p>
                                                <FaPlus size={18} className='mt-[6px] cursor-pointer' onClick={addItem}/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 className='text-[1.2rem]'>Items will appear here!</h1>
                    )}
                </div>
                {menuItems.length > 0 && (
                    <div className="flex flex-col items-center mt-5">
                        <h2 className="text-2xl font-bold text-mainBlack">Total: ${totalPrice}</h2>
                        <button
                            onClick={handlePlaceOrder}
                            className="bg-mainRed text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-red-600 transition duration-200"
                        >
                            Place Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage
