import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout, setCredentials } from '../features/auth/authSlice';
import { useLogoutMutation, useUpdateMutation } from '../features/auth/usersApiSlice';
import { clearCart } from '../features/cart/cartSlice';

const MyAccountPage = () => {
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

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [updatedMessage, setUpdatedMessage] = useState(false);

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
      setPasswordsMatch(false);
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
        setPasswordsMatch(true);
        setUpdatedMessage(true);

        setTimeout(() => {
          window.scroll({ behavior: 'smooth', top: '0' });
        }, 10)

      } catch (err) {
        console.log(err?.data?.message || err.error);
      }
    }
  };

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
  };

  return (
    <div className="flex justify-center items-start py-10 min-h-screen bg-mainWhite">
      <div className="bg-white p-8 shadow-lg border-2 border-mainDarkGray w-[360px] rounded-lg">
        <h1 className="text-mainDarkGray text-[1.8rem] mb-6 text-center font-semibold">My Account</h1>

        {updatedMessage && (
          <div className="text-green-500 text-sm mb-4 text-center">
            Profile Updated!
          </div>
        )}

        <form onSubmit={handleUpdateUser} className="space-y-6">
          {[
            { id: 'name', label: 'Name', type: 'text', value: name, onChange: setName, placeholder: 'Your full name' },
            { id: 'email', label: 'Email', type: 'email', value: email, onChange: setEmail, placeholder: 'Your email' },
            { id: 'phone', label: 'Phone', type: 'tel', value: phone, onChange: setPhone, placeholder: 'Your phone number' },
            { id: 'password', label: 'Password', type: 'password', value: password, onChange: setPassword, placeholder: 'Update password' },
            { id: 'confirmPassword', label: 'Confirm Password', type: 'password', value: confirmPassword, onChange: setConfirmPassword, placeholder: 'Confirm password' }
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

          {!passwordsMatch && (
            <div className="text-red-500 text-sm mb-4 text-center">
              Passwords must match
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-mainYellow w-full border border-mainDarkGray hover:border-mainDarkGray text-mainDarkGray font-semibold py-2 rounded transition duration-200 hover:bg-mainDarkGray hover:text-darkYellow"
            >
              Update Profile
            </button>
          </div>

          <div className="flex justify-center mt-3">
            <button
              onClick={handleLogout}
              type="button"
              className="bg-mainDarkGray w-full border border-transparent text-mainYellow font-semibold py-2 rounded transition duration-200 hover:bg-mainYellow hover:text-mainDarkGray hover:border hover:border-mainDarkGray"
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