import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { useRegisterMutation } from '../features/auth/usersApiSlice';

const RegisterPage = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 10)
    }, [location]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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
            console.log('Passwords don’t match');
        } else {
            try {
                const res = await register({ name, email, phone, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate('/');
            } catch (err) {
                console.log(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="flex justify-center items-start py-10 min-h-screen bg-mainWhite">
            <div className="bg-white p-8 shadow-lg border-2 border-mainDarkGray w-[360px] rounded-lg">
                <h1 className="text-mainDarkGray text-[1.8rem] mb-6 text-center font-semibold">Make an Account</h1>
                <form onSubmit={handleRegister} className="space-y-6">
                    {[
                        { id: 'name', label: 'Name', type: 'text', value: name, onChange: setName, placeholder: 'Your name for orders' },
                        { id: 'email', label: 'Email', type: 'email', value: email, onChange: setEmail, placeholder: 'Your email' },
                        { id: 'phone', label: 'Phone', type: 'tel', value: phone, onChange: setPhone, placeholder: 'Your phone #' },
                        { id: 'password', label: 'Password', type: 'password', value: password, onChange: setPassword, placeholder: 'Your password' },
                        { id: 'confirmPassword', label: 'Confirm Password', type: 'password', value: confirmPassword, onChange: setConfirmPassword, placeholder: 'Your password again' }
                    ].map((field, index) => (
                        <div key={index} className="space-y-3">
                            <label htmlFor={field.id} className="block text-mainDarkGray text-sm">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                id={field.id}
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="w-full px-4 py-2 border border-mainDarkGray focus:outline-none focus:border-blue-500 bg-white text-mainDarkGray rounded transition duration-200"
                                required
                                placeholder={field.placeholder}
                            />
                        </div>
                    ))}

                    <div onClick={() => navigate('/login')} className="text-blue-500 text-sm cursor-pointer text-center hover:underline">
                        <p>Returning customer?</p>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-mainYellow w-full border border-mainDarkGray text-mainDarkGray font-semibold py-2 rounded transition duration-200 hover:bg-mainDarkGray hover:text-darkYellow"
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
