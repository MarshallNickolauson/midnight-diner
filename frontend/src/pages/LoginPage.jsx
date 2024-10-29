import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/usersApiSlice';
import { useGetUserCartQuery } from '../features/cart/cartApiSlice';
import { setCartItems } from '../features/cart/cartSlice';

const LoginPage = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) navigate('/');
    }, [navigate, userInfo]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));

            // When logging in, it doesn't yet fetch the cart pertaining to the user and repopulate the state and local storage

            navigate('/');
        } catch (err) {
            console.log(err?.data?.message || err.error);
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-mainDarkGray -mt-24">
            <div className="bg-mainBlack p-8 shadow-lg border-2 border-mainWhite w-[360px] rounded-lg">
                <h1 className="text-mainWhite text-3xl mb-6 text-center font-semibold">Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-3">
                        <label htmlFor="email" className="block text-mainWhite text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="password" className="block text-mainWhite text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <div onClick={() => navigate('/register')} className="text-mainYellow text-sm cursor-pointer text-center hover:underline">
                        <p>Need an account? Sign up to order faster!</p>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-mainYellow w-full border-2 border-transparent hover:border-mainWhite text-mainBlack font-semibold py-2 rounded transition duration-200 hover:bg-mainBlack hover:text-mainYellow"
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
