import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../features/auth/authSlice';
import { useLogoutMutation, useUpdateMutation } from '../features/auth/usersApiSlice';
import { clearCart } from '../features/cart/cartSlice';

const MyAccountPage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
  }, [userInfo]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords dont match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          phone,
          password
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        console.log(err?.data?.message || err.error);
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(clearCart());
      setTimeout(() => {
        navigate('/');
      }, 1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-start py-10 min-h-screen bg-mainDarkGray">
      <div className="bg-mainBlack p-8 shadow-lg border-2 border-mainWhite w-[360px] rounded-lg">
        <h1 className="text-mainWhite text-3xl mb-6 text-center font-semibold">My Account</h1>
        <form onSubmit={handleUpdateUser} className="space-y-6">
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
            <label htmlFor="phone" className="block text-mainWhite text-sm">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-mainWhite focus:outline-none focus:ring-2 focus:ring-mainYellow bg-mainDarkGray text-mainWhite rounded transition duration-150"
              required
              placeholder="Your phone #"
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
              placeholder="Update password"
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
              placeholder="Confirm password"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-mainYellow w-full border-2 border-transparent hover:border-mainWhite text-mainBlack font-semibold py-2 rounded transition duration-200 hover:bg-mainBlack hover:text-mainYellow"
            >
              Update Profile
            </button>
          </div>

          <div className="flex justify-center mt-3">
            <button
              onClick={handleLogout}
              type="button"
              className="bg-mainBlack w-full border-2 border-mainYellow text-mainYellow font-semibold py-2 rounded transition duration-200 hover:bg-mainYellow hover:text-mainBlack"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccountPage;