import logo from '../assets/img/midnight-diner-logo.png';
import { Link, useLocation } from 'react-router-dom';
import YellowButtonFilled from './YellowButtonFilled';
import YellowButtonHollow from './YellowButtonHollow';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../features/auth/usersApiSlice';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isMyAccountPage = location.pathname === '/my-account';

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    console.log('here1');
    try {
      console.log('here1');
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className='relative mx-auto p-1 pr-5 bg-mainBlack text-lg'>
      <div className="flex items-center justify-between">
        {/* Logo and Links Section */}
        <div className="flex items-center space-x-10">
          <img src={logo} className='h-[90px]' alt="Midnight Diner Logo" />
          <div className='space-x-6 text-mainWhite'>
            <Link className='hover:underline' to='/'>Home</Link>
            <Link className='hover:underline' to='/menu'>Menu</Link>
            <Link className='hover:underline' to='/about'>About Us</Link>
            <Link className='hover:underline' to='/reservations'>Reservations</Link>
          </div>
        </div>

        {/* Account and Button Section */}
        <div className="flex items-center space-x-4 text-mainWhite">
          {/* Conditionally render based on login status */}
          {!userInfo ? (
            // If logged out, show 'Sign in'
            <Link className='hover:underline' to='/login'>Sign in</Link>
          ) : (
            // If logged in, show 'My Account' and 'Cart'
            <>
              <Link className='hover:underline' to='/cart'>Cart</Link>
              <Link className='hover:underline' to='/my-account'>My Account</Link>
              <div onClick={handleLogout} className='hover:underline hover:cursor-pointer'>Logout</div>
            </>
          )}

          {/* Yellow Buttons: Always visible */}
          <YellowButtonFilled text='Order Now' navigateTo='/order' />
          <YellowButtonHollow text='View Menu' navigateTo='/menu' />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
