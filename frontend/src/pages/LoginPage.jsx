import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/usersApiSlice';

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
            navigate('/');
        } catch (err) {
            console.log(err?.data?.message || err.error);
        }

    };

    return (
        <div className="flex justify-center items-start pt-12 min-h-screen bg-mainDarkGray">
            <div className="bg-mainBlack p-10 shadow-lg border-2 mb-10 border-mainWhite w-[350px]">
                <h1 className="text-mainWhite text-2xl mb-5 text-center">Login</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-mainWhite">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-mainWhite focus:outline-none focus:ring-1 focus:ring-mainWhite transition-all duration-100 ease-in-out bg-mainDarkGray text-mainWhite"
                            required
                            placeholder='Your email'
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-mainWhite">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-mainWhite focus:outline-none focus:ring-1 focus:ring-mainWhite transition-all duration-100 ease-in-out bg-mainDarkGray text-mainWhite"
                            required
                            placeholder='Your password'
                        />
                    </div>

                    <div onClick={() => navigate('/register')} className='text-blue-400 text-sm space-y-1 inline-block hover:text-mainWhite hover:cursor-pointer transition-all duration-100'>
                        <p className='text-md'>Need an account?</p>
                        <p className='text-xs'>You can order faster!</p>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-mainBlack w-full hover:bg-mainYellow hover:border-mainYellow hover:text-mainYellow cursor-pointer border-2 border-mainYellow transition-all duration-300 ease-in-out group py-3"
                        >
                            <h1 className="text-mainYellow text-lg transition-all duration-100 ease-in-out group-hover:text-mainBlack">
                                Log In
                            </h1>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
