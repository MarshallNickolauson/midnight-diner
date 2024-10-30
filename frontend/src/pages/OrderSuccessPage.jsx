import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center items-start py-10 pb-52 bg-mainDarkGray">
            <div className="bg-mainBlack p-8 shadow-lg border-2 border-mainWhite w-[360px] rounded-lg text-center">
                <h1 className="text-mainWhite text-3xl mb-6 font-semibold">Order Confirmed!</h1>
                <p className="text-mainWhite mb-6">
                    Your order has been made! It will be ready at 12345 Main Street in 20-30 minutes.
                </p>
                <button
                    onClick={handleGoHome}
                    className="bg-mainYellow border-2 border-transparent hover:border-mainWhite text-mainBlack font-semibold py-2 px-6 rounded transition duration-200 hover:bg-mainBlack hover:text-mainYellow"
                >
                    Great!
                </button>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
