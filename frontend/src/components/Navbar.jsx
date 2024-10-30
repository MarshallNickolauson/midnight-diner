import { useEffect, useRef, useState } from 'react';
import logo from '../assets/img/midnight-diner-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import YellowButtonFilled from './YellowButtonFilled';
import { useSelector } from 'react-redux';
import { IoBagOutline } from "react-icons/io5";
import { PiSignIn } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi"; // Icon for hamburger menu
import { IoClose } from "react-icons/io5"; // Icon for closing menu

function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const navigate = useNavigate();

  const navItemUnderline = `border-b-2 pb-1 border-b-transparent hover:border-b-mainWhite transition-all duration-100`;

  // Toggle dropdown menu
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className='fixed top-0 w-full z-50 bg-mainBlack text-lg shadow-lg'>
      <div className="flex items-center justify-between mx-auto p-1 pr-5">
        {/* Logo and Nav Links */}
        <div className="flex items-center space-x-10">
          <img src={logo} className='h-[90px]' alt="Midnight Diner Logo" />
          <div className='hidden lg:flex space-x-6 text-mainWhite'>
            <Link className={navItemUnderline} to='/'>Home</Link>
            <Link className={navItemUnderline} to='/menu'>Menu</Link>
            <Link className={navItemUnderline} to='/about'>About Us</Link>
            <Link className={navItemUnderline} to='/reviews'>Reviews</Link>
            <Link className={navItemUnderline} to='/booking'>Reservations</Link>
          </div>
        </div>

        {/* Right Side with Cart, Login, Order Button */}
        <div className="hidden lg:flex items-center space-x-4 text-mainWhite">
          <div
            onClick={() => navigate('/mybag')}
            className={`flex flex-row items-center space-x-1 ${navItemUnderline} hover:cursor-pointer`}>
            <IoBagOutline size={23} className='mb-1' />
            <Link to='/mybag'>Your Bag</Link>
          </div>
          {!userInfo ? (
            <div className={`flex items-center space-x-1 ${navItemUnderline}`}>
              <PiSignIn size={25} />
              <Link className={`mr-4`} to='/login'>Sign in</Link>
            </div>
          ) : (
            <Link className={`mr-4 ${navItemUnderline}`} to='/account'>Hi, {userInfo.name}</Link>
          )}
          <YellowButtonFilled text='Order Now' navigateTo='/order' />
        </div>

        {/* Hamburger Menu Icon for Small Screens */}
        <div className="flex lg:hidden items-center">
          <button onClick={toggleMenu} className="text-mainWhite">
            {isOpen ? <IoClose size={28} /> : <GiHamburgerMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      <div ref={menuRef} className={`overflow-hidden lg:hidden transition-[max-height] duration-300 ease-in-out bg-mainBlack text-mainWhite ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col items-end px-5 pb-6 space-y-6 text-xl">
          <div className="flex items-center space-x-1 hover:underline" onClick={() => navigate('/mybag')}>
            <IoBagOutline size={23} />
            <Link to='/mybag'>Your Bag</Link>
          </div>
          {!userInfo ? (
            <div className="flex items-center space-x-1 hover:underline">
              <PiSignIn size={25} />
              <Link to='/login' onClick={toggleMenu}>Sign in</Link>
            </div>
          ) : (
            <Link to='/account' className='hover:underline' onClick={toggleMenu}>Hi, {userInfo.name}</Link>
          )}
          <hr className='border-b border-gray-400 w-full' />
          <Link className='hover:underline' to='/' onClick={toggleMenu}>Home</Link>
          <Link className='hover:underline' to='/menu' onClick={toggleMenu}>Menu</Link>
          <Link className='hover:underline' to='/about' onClick={toggleMenu}>About Us</Link>
          <Link className='hover:underline' to='/reviews' onClick={toggleMenu}>Revews</Link>
          <Link className='hover:underline' to='/booking' onClick={toggleMenu}>Reservations</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
