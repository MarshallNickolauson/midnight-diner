import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center items-start py-10 min-h-screen bg-mainWhite">
            <div className="bg-white p-8 shadow-lg border-2 border-mainDarkGray w-[360px] rounded-lg text-center">
                <h1 className="text-mainDarkGray text-[1.8rem] mb-6 font-semibold">Order Confirmed!</h1>
                <p className="text-mainDarkGray mb-6">
                    Your order has been made! It will be ready at 12345 Main Street in 20-30 minutes.
                </p>
                <button
                    onClick={handleGoHome}
                    className="bg-mainYellow border border-mainDarkGray text-mainDarkGray font-semibold py-2 px-6 rounded transition duration-200 hover:bg-mainDarkGray hover:text-darkYellow"
                >
                    Great!
                </button>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
