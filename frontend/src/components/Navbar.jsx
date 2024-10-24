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
    <nav className='relative mx-auto p-1 pr-5 bg-mainBlack'>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <img src={logo} className='h-[90px]' alt="Midnight Diner Logo" />
          <div className='space-x-6 text-white text-lg'>
            <Link className='hover:underline' to='/'>Home</Link>
            <Link className='hover:underline' to='/menu'>Menu</Link>
            <Link className='hover:underline' to='/about'>About Us</Link>
            <Link className='hover:underline' to='/reservations'>Reservations</Link>
          </div>
        </div>
        <div className="flex space-x-4">
          <YellowButtonFilled text='Order Now' navigateTo='/welcome' />
          {userInfo ? (
            isMyAccountPage ? (
              <div onClick={handleLogout}>
                <YellowButtonHollow text='Logout' />
              </div>
            ) : (
              <YellowButtonHollow text='My Account' navigateTo='/my-account' />
            )
          ) : (
            <YellowButtonHollow text='Login' navigateTo='/login' />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
