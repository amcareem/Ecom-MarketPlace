import React from 'react'
import { useGlobalContext } from './context';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Carttotal = () => {
    // const{cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice} = useGlobalContext();
    const navigate = useNavigate();
    const location = useLocation();
    const cartProductCounter = JSON.parse(localStorage.getItem('totalQuantity'));
    const cartTotalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    const {cartList,defaultAddress} = useGlobalContext();

    const showToast = () => {
      toast.error('Please add an default address', {
        position: "bottom-left",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    };
  
    const handleCheckout = () =>{
      if(location.pathname === '/checkout'){
        if(defaultAddress)navigate('/checkout/reviewpage')
        else{
          showToast();
        }
      }
      else{
        navigate('/checkout');
        window.localStorage.setItem('cartList',JSON.stringify(cartList));
      }
      
    }
  return (
    <>
      <div className={`lg:h-fit pb-2 lg:pb-4 flex flex-col justify-around bg-white 
      ${(location.pathname === '/checkout' || location.pathname === '/checkout/reviewpage' || location.pathname === '/checkout/paymentpage') 
      ? 'px-2 py-1 lg:py-0 lg:px-0 border border-slate-300' : 
      'lg:border lg:border-slate-300 px-0'} lg:rounded-md`}>
        
            <div className='hidden lg:block py-3 px-6 text-navColor text-2xl lg:border-b lg:border-slate-300 font-bold'>Price details</div>
            <div className='hidden font-medium px-6 py-8 lg:flex flex-col gap-3'>
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
            <div className='flex gap-2 lg:gap-0 items-center lg:justify-between pb-1 lg:py-3 lg:px-6 text-navColor text-xl lg:text-2xl lg:border-y lg:border-slate-300 font-semibold lg:font-bold'>
              <div className=''>Total price</div>
              <div className='font-medium text-md'>₹{cartTotalPrice-500}</div>
            </div>
            <div className='lg:px-6 font-semibold text-green-600 text-sm lg:text-lg mt-1 lg:mt-3'>You will save total ₹500 on this order</div>
            {
              (location.pathname === '/checkout')?
              <button onClick={()=>handleCheckout()}className='w-full lg:w-80 h-8 lg:h-10 mt-2 lg:mt-4 rounded-md lg:rounded-xl text-center font-medium text-base lg:text-lg lg:mx-auto bg-buttonColor text-white'>Use this address</button>:
              (location.pathname == '/checkout/reviewpage')?
              <button onClick={()=>navigate('/checkout/paymentpage')} className='w-80 h-8 lg:h-10 mt-2 lg:mt-4 rounded-md lg:rounded-xl text-center font-medium text-lg mx-auto bg-buttonColor text-white'>Use this payment method</button>:
              <button onClick={()=>handleCheckout()}className='w-full lg:w-80 h-9 mt-4 rounded-md lg:rounded-xl text-center font-medium text-lg lg:mx-auto bg-buttonColor text-white'>Proceed to payment</button>
            }
        </div>
    </>
  )
}

export default Carttotal
