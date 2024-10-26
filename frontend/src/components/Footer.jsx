import { Link } from 'react-router-dom'
import facebook from '../assets/img/icon-facebook.svg'
import youtube from '../assets/img/icon-youtube.svg'
import twitter from '../assets/img/icon-twitter.svg'
import pinterest from '../assets/img/icon-pinterest.svg'
import instagram from '../assets/img/icon-instagram.svg'
import logo from '../assets/img/midnight-diner-logo.png'
import { useState } from 'react'

function Footer() {

  const footerLinks = [
    facebook,
    twitter,
    pinterest,
    instagram,
  ]

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    console.log(email);
    setEmail('');
  }

  return (
    <footer className='bg-veryDarkBlue'>
      <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
        <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
          <div className="mx-auto my-6 text-center text-white md:hidden">
            Copyright &copy; 2024, All Right Reserved
          </div>
          <div>
            <img src={logo} className='h-24' alt="Logo" />
          </div>
          <div className="flex justify-center space-x-4">
            {footerLinks.map((link) => (
              <Link key={link} to='/'>
                <img src={link} className='h-8' alt="" />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-around space-x-16">
          <div className="flex flex-col space-y-3 text-mainWhite">
            <Link className='hover:underline' to='/'>Home</Link>
            <Link className='hover:underline' to='/'>About Us</Link>
            <Link className='hover:underline' to='/'>Order Online</Link>
            <Link className='hover:underline' to='/'>Rewards</Link>
          </div>
          <div className="flex flex-col space-y-3 text-mainWhite">
            <Link className='hover:underline' to='/'>Careers</Link>
            <Link className='hover:underline' to='/'>Locations</Link>
            <Link className='hover:underline' to='/'>Privacy Policy</Link>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <form onSubmit={handleSubmit}>
            <h1 className='text-mainWhite pb-2'>Updates in your inbox:</h1>
            <div className="flex space-x-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 border border-mainWhite focus:outline-none focus:ring-1 focus:ring-mainWhite transition-all duration-100 ease-in-out bg-mainDarkGray text-mainWhite"
                placeholder='Your email'
                required
              />
              <button
                className="px-6 py-3 text-mainYellow border-2 border-mainYellow transition-all duration-300 ease-in-out hover:bg-mainYellow focus:outline-none group"
              >
                <h1 className="text-mainYellow text-lg transition-all duration-100 ease-in-out group-hover:text-mainBlack">
                  Go
                </h1>
              </button>
            </div>
          </form>
          <div className="hidden text-mainWhite md:block">
            Copyright &copy; 2024, All Right Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
