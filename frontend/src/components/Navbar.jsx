import logo from '../assets/img/midnight-diner-logo.png';
import { Link } from 'react-router-dom';
import YellowButtonFilled from './YellowButtonFilled';
import { useSelector } from 'react-redux';
import { IoBagOutline } from "react-icons/io5";
import { PiSignIn } from "react-icons/pi";

function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);

  const navItemUnderline = `border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100`;

  return (
    <nav className='fixed top-0 w-full z-50 bg-mainBlack text-lg shadow-lg'>
      <div className="flex items-center justify-between mx-auto p-1 pr-5">
        <div className="flex items-center space-x-10">
          <img src={logo} className='h-[90px]' alt="Midnight Diner Logo" />
          <div className='space-x-6 text-mainWhite'>
            <Link className={navItemUnderline} to='/'>Home</Link>
            <Link className={navItemUnderline} to='/menu'>Menu</Link>
            <Link className={navItemUnderline} to='/about'>About Us</Link>
            <Link className={navItemUnderline} to='/locations'>Locations</Link>
            <Link className={navItemUnderline} to='/booking'>Reservations</Link>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-mainWhite">
          <div
            onClick={() => navigate('/mybag')}
            className={`flex flex-row items-center space-x-1 ${navItemUnderline} hover:cursor-pointer`}>
            <IoBagOutline size={23} className='mb-1' />
            <Link to='/mybag'>Your Bag</Link>
          </div>
          {!userInfo ? (
            <div className={`flex items-center space-x-1 ${navItemUnderline}`}>
              <PiSignIn size={25} className='' />
              <Link className={`mr-4`} to='/login'>Sign in</Link>
            </div>
          ) : (
            <Link className={`mr-4 ${navItemUnderline}`} to='/account'>Hi, {userInfo.name}</Link>
          )}
          <YellowButtonFilled text='Order Now' navigateTo='/menu' />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
