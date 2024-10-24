import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../features/auth/authSlice';
import { useLogoutMutation, useUpdateMutation } from '../features/auth/usersApiSlice';

const MyAccountPage = () => {
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
  const [updateProfile, { isLoading }] = useUpdateMutation();
  const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

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
      setTimeout(() => {
        navigate('/');
      }, 1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-start pt-10 min-h-screen bg-mainDarkGray">
      <div className="bg-mainBlack p-10 shadow-lg border-2 mb-10 border-mainWhite w-[350px]">
        <h1 className="text-mainWhite text-2xl mb-5 text-center">My Account</h1>
        <form onSubmit={handleUpdateUser} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-mainWhite">
              Name
            </label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-mainWhite focus:outline-none focus:ring-1 focus:ring-mainWhite transition-all duration-100 ease-in-out bg-mainDarkGray text-mainWhite"
              required
              placeholder='Your name for orders'
            />
          </div>
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
              placeholder='Update password'
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-mainWhite">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-mainWhite focus:outline-none focus:ring-1 focus:ring-mainWhite transition-all duration-100 ease-in-out bg-mainDarkGray text-mainWhite"
              placeholder='Confirm password'
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-mainYellow w-full mt-3 hover:bg-mainBlack cursor-pointer border-2 border-mainYellow transition-all duration-300 ease-in-out group py-3"
            >
              <h1 className="text-mainBlack text-lg transition-all duration-100 ease-in-out group-hover:text-mainYellow">
                Update Profile
              </h1>
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              type='button'
              className="bg-mainBlack w-full hover:bg-mainYellow hover:border-mainYellow hover:text-mainYellow cursor-pointer border-2 border-mainYellow transition-all duration-300 ease-in-out group py-3"
            >
              <h1 className="text-mainYellow text-lg transition-all duration-100 ease-in-out group-hover:text-mainBlack">
                Logout
              </h1>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default MyAccountPage;