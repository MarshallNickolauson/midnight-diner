import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetOrdersMutation } from '../features/order/orderApiSlice';

const OrderSearchPage = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

    const [email, setEmail] = useState('');
    const [searched, setSearched] = useState(false);
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    const [getOrders, { isLoading }] = useGetOrdersMutation();

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await getOrders({ email: email }).unwrap();
            setOrders(res);
            setSearched(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-start py-10 min-h-screen bg-mainWhite">
            <div className="bg-white p-8 shadow-lg border-2 border-mainDarkGray w-[360px] rounded-lg">
                <h1 className="text-mainDarkGray text-[1.4rem] mb-6 text-center font-semibold">Search for an Order</h1>
                <div className="justify-center text-center mb-4">
                    <p
                        onClick={() => navigate('/mybag')}
                        className="inline-block text-blue-500 text-sm cursor-pointer hover:underline"
                    >Back to My Bag</p>
                </div>
                <form onSubmit={handleSearchSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <label htmlFor="search" className="block text-mainDarkGray text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            id="search"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-mainYellow w-full border border-mainDarkGray hover:border-mainDarkGray text-mainDarkGray font-semibold py-2 rounded transition duration-200 hover:bg-mainDarkGray hover:text-darkYellow"
                        >
                            Search
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-mainDarkGray">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order._id} className="border border-mainDarkGray p-4 rounded mb-4">
                                <h2 className="text-lg"><strong>Name:</strong> {order.name}</h2>
                                <p><strong>Name:</strong> {order.name}</p>
                                <p><strong>Email:</strong> {order.email}</p>
                                <p><strong>Phone:</strong> {order.phone}</p>
                                <p><strong>Total:</strong> {order.totalPrice}</p>
                                <p><strong>Status:</strong> {order.status}</p>
                            </div>
                        ))
                    ) : (
                        searched && <p>No orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderSearchPage;
