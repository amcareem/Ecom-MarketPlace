import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();

  const isActive = (currentPath,linkPath) => {
    return (currentPath === linkPath) ? 
    'w-full h-full border-2 font-semibold border-buttonColor flex justify-center items-center text-lg bg-white text-buttonColor'
    : 'w-full h-full border font-semibold border-white flex justify-center items-center text-lg bg-buttonColor text-white'
  }
  return (
    <>
    <div className=''>
     <ul className='relative font-Inter flex  h-12 justify-between'>
        <li className='w-4/12'><Link to='/checkout' className={isActive(location.pathname,'/checkout')}>Delivery Adress</Link></li>
        <li className='w-4/12'><Link to='/checkout/paymentpage' className={isActive(location.pathname,'/checkout/paymentpage')}>Payment Method</Link></li>
        <li className='w-4/12'><Link to='/checkout/deliverypage'  className={isActive(location.pathname,'/checkout/deliverypage')}>Review items and delivery</Link></li>
     </ul> 
    </div>
    </>
  )
}

export default Checkout
