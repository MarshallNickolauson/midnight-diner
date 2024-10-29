import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { useRegisterMutation } from '../features/auth/usersApiSlice';

const RegisterPage = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) navigate('/');
    }, [navigate, userInfo]);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log('Passwords dont match');
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/');
            } catch (err) {
                console.log(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="flex justify-center items-start pt-10 min-h-screen bg-mainDarkGray">
            <div className="bg-mainBlack p-8 shadow-lg border-2 border-mainWhite w-[360px] rounded-lg">
                <h1 className="text-mainWhite text-3xl mb-6 text-center font-semibold">Make an Account</h1>
                <form onSubmit={handleRegister} className="space-y-6">

                    <div className="space-y-3">
                        <label htmlFor="name" className="block text-mainWhite text-sm">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            placeholder="Your name for orders"
                        />
                    </div>

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
                            placeholder="Your email"
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
                            placeholder="Your password"
                        />
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="confirmPassword" className="block text-mainWhite text-sm">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
                            required
                            placeholder="Your password again"
                        />
                    </div>

                    <div onClick={() => navigate('/login')} className="text-mainYellow text-sm cursor-pointer text-center hover:underline">
                        <p>Returning customer?</p>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-mainYellow w-full border-2 border-transparent hover:border-mainWhite text-mainBlack font-semibold py-2 rounded transition duration-200 hover:bg-mainBlack hover:text-mainYellow"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
