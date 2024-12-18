import { useEffect, useState } from 'react';
import BlackButtonHollow from '../components/BlackButtonHollow';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { addItemToCart, clearCart, clearSpecificItemFromCart, removeItemFromCart } from '../features/cart/cartSlice';
import { useCreateOrderMutation } from '../features/order/orderApiSlice';
import { useDeleteCartItemMutation, useUpdateCartMutation } from '../features/cart/cartApiSlice';

const CartPage = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const menuItems = useSelector((state) => state.cart.menuItems);

    const [updateCart] = useUpdateCartMutation();
    const [deleteCartItem] = useDeleteCartItemMutation();
    const [placeOrder, { isLoading }] = useCreateOrderMutation();
    const [showOrderForm, setShowOrderForm] = useState(false);

    const [orderDetails, setOrderDetails] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        phone: userInfo?.phone || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prev) => ({ ...prev, [name]: value }));
    };

    const fullImageUrl = `http://localhost:5000/assets/`;

    const totalPrice = menuItems.reduce((total, item) => {
        return total + (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity;
    }, 0).toFixed(2);

    const addItem = (item) => {
        dispatch(addItemToCart(item));
        if (userInfo) {
            updateCart({ menuItemId: item._id, action: 'add' });
        }
    };

    const removeItem = (item) => {
        dispatch(removeItemFromCart(item));
        if (userInfo) {
            updateCart({ menuItemId: item._id, action: 'remove' });
        }
    };

    const deleteMenuItem = (item) => {
        dispatch(clearSpecificItemFromCart(item));
        if (userInfo) {
            deleteCartItem({ menuItemId: item._id });
        }
    };

    const handlePlaceOrder = async () => {
        const items = menuItems.map(item => ({
            menuItemId: item._id,
            quantity: item.quantity,
        }));

        try {
            await placeOrder({
                ...orderDetails,
                items,
                totalPrice,
            }).unwrap();

            dispatch(clearCart());

            navigate('/order/success');

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-mainWhite py-3 min-h-screen pb-8'>
            <div className='text-center'>
                <h1 className='text-[3rem] text-mainBlack font-bold'>YOUR <span className='text-mainRed'>BAG</span></h1>
                <h1 className='text-[1.2rem]'>Here you'll see what you've added to your takeout bag.</h1>
                <div className='flex flex-col'>
                    <div>
                        <h1
                            onClick={() => navigate('/order/search')}
                            className='text-[1rem] mt-5 cursor-pointer inline-block text-blue-500 hover:underline'>
                            Search for an Order
                        </h1>
                    </div>
                    {!userInfo && (
                        <h1
                            onClick={() => navigate('/login')}
                            className='text-[1rem] mt-5 cursor-pointer inline-block text-blue-500 hover:underline'>
                            For the best experience, please sign in.
                        </h1>
                    )}
                </div>
                <div className='flex justify-center mt-5'>
                    <BlackButtonHollow title='View Menu' navigateTo='/menu' width='160' />
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-5">
                    {menuItems.length > 0 ? (
                        menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row bg-white shadow-gray-400 shadow-md rounded-lg p-4 w-2/3"
                            >
                                <img
                                    src={`${fullImageUrl}${item.imageUrl}`}
                                    alt={item.name}
                                    className="hidden md:block w-[145px] h-[145px] object-cover rounded-md shadow-mainBlack shadow-md mb-4 md:mb-0 md:mr-4"
                                />
                                <div className="flex flex-col justify-between w-full">
                                    <div className="flex flex-col justify-between h-full text-left space-y-2">
                                        <div className="flex flex-row justify-between">
                                            <h2 className="text-lg md:text-xl font-bold text-mainBlack tracking-wide">
                                                {item.name}
                                            </h2>
                                            <FaTrashAlt
                                                size={18}
                                                className="cursor-pointer"
                                                color="#DA4569"
                                                onClick={() => deleteMenuItem(item)}
                                            />
                                        </div>
                                        <p className="text-gray-600 text-sm md:text-base line-clamp-1">
                                            {item.description}
                                        </p>
                                        <div>
                                            <p
                                                onClick={() => console.log('Read more button')}
                                                className="inline-block text-blue-500 text-sm md:text-base cursor-pointer hover:underline"
                                            >
                                                Read More
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold">
                                                {item.salePrice > 0 ? (
                                                    <>
                                                        <span className="text-mainRed">
                                                            ${(item.salePrice * item.quantity).toFixed(2)}
                                                        </span>
                                                        <span className="line-through text-gray-500 pl-2">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-mainRed">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                )}
                                            </span>
                                            <div className="flex flex-row space-x-3 items-center">
                                                <div onClick={() => removeItem(item)}>
                                                    <FaMinus
                                                        size={18}
                                                        className="cursor-pointer hover:text-mainRed transition duration-200"
                                                    />
                                                </div>
                                                <p className="text-mainDarkGray text-lg">Qty: {item.quantity}</p>
                                                <div onClick={() => addItem(item)}>
                                                    <FaPlus
                                                        size={18}
                                                        className="cursor-pointer hover:text-mainRed transition duration-200"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 className="text-[1.2rem]">Items will appear here!</h1>
                    )}
                </div>


                {menuItems.length > 0 && (
                    <div className="flex flex-col items-center mt-5">
                        <h2 className="text-2xl font-bold text-mainBlack">Total: ${totalPrice}</h2>
                        <div className="flex space-x-4 mt-4">
                            {showOrderForm ? (
                                <div className="space-y-4 w-1/3 mx-auto">
                                    <input
                                        type="text"
                                        name="name"
                                        value={orderDetails.name}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={orderDetails.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={orderDetails.phone}
                                        onChange={handleInputChange}
                                        placeholder="Phone"
                                        className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                                    />
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="bg-mainRed text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-red-600 transition duration-200"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/menu')}
                                        className="bg-mainBlack text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                                    >
                                        Double Check Menu
                                    </button>
                                    <button
                                        onClick={() => setShowOrderForm(true)}
                                        className="bg-mainRed text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Looks Good!
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;