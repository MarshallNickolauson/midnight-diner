import logo from '../assets/img/midnight-diner-logo.png';
import { Link } from 'react-router-dom';
import YellowButtonFilled from './YellowButtonFilled';
import YellowButtonHollow from './YellowButtonHollow';
import { useSelector } from 'react-redux';

function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <nav className='relative mx-auto p-1 pr-5 bg-mainBlack text-lg'>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <img src={logo} className='h-[90px]' alt="Midnight Diner Logo" />
          <div className='space-x-6 text-mainWhite'>
            <Link className='hover:underline' to='/'>Home</Link>
            <Link className='hover:underline' to='/menu'>Menu</Link>
            <Link className='hover:underline' to='/about'>About Us</Link>
            <Link className='hover:underline' to='/reservations'>Reservations</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-mainWhite">
          {!userInfo ? (
            <Link className='hover:underline mr-4' to='/login'>Sign in</Link>
          ) : (
            <div className='inline-block mr-4 space-x-4'>
              <Link className='hover:underline' to='/cart'>Cart</Link>
              <Link className='hover:underline' to='/my-account'>My Account</Link>
            </div>
          )}
          <YellowButtonFilled text='Order Now' navigateTo='/order' />
          <YellowButtonHollow text='View Menu' navigateTo='/menu' />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
