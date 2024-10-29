import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className='mt-[100px]'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default MainLayout;
