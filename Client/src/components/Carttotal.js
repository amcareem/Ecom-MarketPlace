import React from 'react'
import { useGlobalContext } from './context';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Carttotal = () => {
    // const{cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice} = useGlobalContext();
    const navigate = useNavigate();
    const location = useLocation();
    const cartProductCounter = JSON.parse(localStorage.getItem('totalQuantity'));
    const cartTotalPrice = JSON.parse(localStorage.getItem('totalPrice'));
  return (
    <>
      <div className='border h-fit pb-4 flex flex-col justify-around border-slate-300  rounded-md'>
            <div className='py-3 px-6 text-navColor text-2xl border-b border-slate-300 font-bold border-'>Price details</div>
            <div className='font-medium px-6 py-8 flex flex-col gap-3'>
              <div className='text-xl flex justify-between'>
                <div>Total price{"("}{cartProductCounter}{" items)"} : </div>
                <div className='font-medium text-md '>₹{cartTotalPrice}</div> 
              </div>
              <div className='text-xl flex justify-between'>
                <div>Discount :</div> 
                <div className='font-normal text-green-600 text-md'>-₹500</div>
                </div>
              <div className='text-xl flex justify-between'>
                <div>Delivery charges : </div>
                <div className='font-medium text-green-600 text-md'>FREE</div>
              </div>
            </div>
            <div className='flex justify-between py-3 px-6 text-navColor text-2xl border-y border-slate-300 font-bold'>
              <div>Total price</div>
              <div className='font-medium text-md'>₹{cartTotalPrice-500}</div>
            </div>
            <div className='px-6 font-semibold text-green-600 text-lg mt-3'>You will save total ₹500 on this order</div>
            {
              (location.pathname === '/checkout')?
              <button onClick={()=>navigate('/checkout/paymentpage')}className='w-80 h-10 mt-4 rounded-xl text-center font-medium text-lg mx-auto bg-buttonColor text-white'>Use this address</button>:
              (location.pathname == '/checkout/paymentpage')?
              <button onClick={()=>navigate('/checkout/deliverypage')} className='w-80 h-10 mt-4 rounded-xl text-center font-medium text-lg mx-auto bg-buttonColor text-white'>Review</button>:
              <button onClick={()=>navigate('/checkout')}className='w-80 h-10 mt-4 rounded-xl text-center font-medium text-lg mx-auto bg-buttonColor text-white'>Proceed to buy</button>
            }
        </div>
    </>
  )
}

export default Carttotal
