import React from 'react'
import Checkout from './Checkout'
import { Outlet } from 'react-router-dom';
import Carttotal from '../../components/Carttotal.js';
import { useEffect, useState } from 'react';
import '../../App.css';
const Layout = () => {
  const [isSticky, setIsSticky] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('bottom-navbar');
      const threshold = navbar.offsetHeight + 20;

      if (window.scrollY > threshold) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
    <div className='lg:h-screen flex flex-col lg:flex-row mt-3 lg:mt-16 justify-around'>
      <div className='flex flex-col items-center gap-4 lg:gap-10 bg-white font-Inter w-full lg:w-8/12 h-fit lg:border lg:border-slate-300 rounded-lg p-1 lg:p-6'>
          <div className='w-full'>
            <Checkout />
          </div>
          <div className='w-full h-screen lg:h-fit'>
            <Outlet />
          </div>
      </div>
      
        <div className='hidden lg:block w-3/12'>
          <Carttotal />
        </div>
        <nav id="bottom-navbar" className={`bottom-navbar ${isSticky ? 'sticky' : ''}bg-white w-full block lg:hidden mb-4 drop-shadow-searchShadow`}>
        {/* <div className='bg-white w-full px-3 py-1 block lg:hidden'> */}
          <Carttotal />
        {/* </div> */}
        </nav>
        <div>
          
        </div>
      </div>
    </>
  )
}

export default Layout
