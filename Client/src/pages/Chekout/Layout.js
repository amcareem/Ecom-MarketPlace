import React from 'react'
import Checkout from './Checkout'
import { Outlet } from 'react-router-dom';
import Carttotal from '../../components/Carttotal.js';

const Layout = () => {
  return (
    <>
    <div className='flex mt-16 justify-around'>
      <div className='flex flex-col items-center gap-10 bg-white font-Inter w-8/12 h-fit border border-slate-300 rounded-lg p-6'>
          <div className='w-full'>
            <Checkout />
          </div>
          <div className='w-full'>
            <Outlet />
          </div>
      </div>
      
        <div className='w-3/12'>
          <Carttotal />
        </div>
      </div>
    </>
  )
}

export default Layout
