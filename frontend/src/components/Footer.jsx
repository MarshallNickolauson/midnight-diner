import { Link } from 'react-router-dom';
import facebook from '../assets/img/icon-facebook.svg';
import twitter from '../assets/img/icon-twitter.svg';
import pinterest from '../assets/img/icon-pinterest.svg';
import instagram from '../assets/img/icon-instagram.svg';
import logo from '../assets/img/midnight-diner-logo-long.png';
import { useState } from 'react';

function Footer() {
  const footerLinks = [
    facebook,
    twitter,
    pinterest,
    instagram,
  ];

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail('');
  };

  return (
    <footer className="bg-veryDarkBlue">
      <div className="container flex flex-col justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
        <div className="flex flex-col items-center md:items-start md:w-1/3 space-y-6">
          <div className="hidden md:block mb-6">
            <img
              src={logo}
              className="w-3/4 max-w-xs lg:max-w-md xl:max-w-lg"
              alt="Logo"
            />
          </div>

          <div className="flex space-x-4">
            {footerLinks.map((link) => (
              <Link key={link} to="/">
                <img src={link} className="h-8" alt="" />
              </Link>
            ))}
          </div>

          <div className="text-center text-white mt-6 md:hidden">
            Copyright &copy; 2024, All Rights Reserved
          </div>
        </div>

        <div className="flex flex-wrap justify-center space-x-8 md:space-x-16 md:w-1/3 text-mainWhite">
          <div className="flex flex-col space-y-3">
            <Link className="hover:underline" to="/">Home</Link>
            <Link className="hover:underline" to="/">About Us</Link>
            <Link className="hover:underline" to="/">Order Online</Link>
            <Link className="hover:underline" to="/">Rewards</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <Link className="hover:underline" to="/">Careers</Link>
            <Link className="hover:underline" to="/">Locations</Link>
            <Link className="hover:underline" to="/">Privacy Policy</Link>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center md:items-end md:w-1/3">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h1 className="text-mainWhite pb-2 text-center md:text-left">Updates to your inbox:</h1>
            <div className="flex space-x-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 border border-mainWhite bg-mainDarkGray text-mainWhite focus:outline-none focus:ring-1 focus:ring-mainWhite transition-all duration-100 ease-in-out"
                placeholder="Your email"
                required
              />
              <button
                className="px-6 py-3 text-mainYellow border-2 border-mainYellow transition-all duration-300 ease-in-out hover:bg-mainYellow focus:outline-none group"
              >
                <span className="text-mainYellow text-lg transition-all duration-100 ease-in-out group-hover:text-mainBlack">
                  Go
                </span>
              </button>
            </div>
          </form>

          <div className="hidden text-mainWhite md:block mt-4">
            Copyright &copy; 2024, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
