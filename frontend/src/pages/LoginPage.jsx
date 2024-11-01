import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/usersApiSlice';
import { getUserCart } from '../features/cart/cartSlice';

const LoginPage = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading, isError }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) navigate('/');
    }, [navigate, userInfo]);

    useEffect(() => {
        if (isError) {
            setEmail('');
            setPassword('');
        }
    }, [isError]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));

            dispatch(getUserCart());

            navigate('/');
        } catch (err) {
            console.log(err?.data?.message || err.error);
        }
    };

    return (
        <div className="flex justify-center items-center bg-mainWhite py-20">
            <div className="bg-white p-8 shadow-lg border-2 border-mainDarkGray w-[360px] rounded-lg">
                <h1 className="text-mainDarkGray text-3xl mb-6 text-center font-semibold">Login</h1>
                {isError && (
                    <div className="text-red-500 text-sm mb-4 text-center">
                        Email or password not found
                    </div>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-3">
                        <label htmlFor="email" className="block text-mainDarkGray text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="space-y-3">
                        <label htmlFor="password" className="block text-mainDarkGray text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <div onClick={() => navigate('/register')} className="text-blue-500 text-sm cursor-pointer text-center hover:underline">
                        <p>Need an account? Sign up to order faster!</p>
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-mainYellow w-full border border-mainDarkGray hover:border-mainDarkGray text-mainDarkGray font-semibold py-2 rounded transition duration-200 hover:bg-mainDarkGray hover:text-darkYellow"
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
