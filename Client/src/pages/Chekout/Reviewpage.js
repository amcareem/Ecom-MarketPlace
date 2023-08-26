import React from 'react'
import { useGlobalContext } from '../../components/context'

const Reviewpage = () => {
    const{defaultAddress,userAddress} = useGlobalContext();
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    // const[deliveryAddress,setDeliveryAddress];
  return (
    <>
      {
        cartList.map((curr)=>{
            return <div className='border-1 h-fit  border-white m-auto font-Inter capitalize rounded-lg bg-cardColor flex lg:items-center gap-2 pl-2 pr-1 lg:px-4  py-3 mb-2'>
              <div className='flex flex-col gap-2 w-5/12 lg:w-3/12 mr-3 lg:mr-0 '>
                <div className=''><img className='py-1 w-full lg:w-11/12' src={`http://localhost:3002/${curr.ImagePath}`}/></div>
                <div className='text-center block lg:hidden'>quantity : {curr.quantity}</div>
              </div>
              <div className='flex flex-col gap-2 w-6/12 justify-start items-start'>
                <div className='text-md lg:text-xl font-semibold'>{curr.productName}</div>
                <div className='text-xs font-medium'>
                  Delivery by 12th january
                </div>
                <div className='text-green-500 text-sm font-semibold'>
                  In stock
                </div>
                <div className=''>
                  <div className='text-xl font-semibold'>₹{curr.productAmount}</div>
                </div>
            </div>
            <div className='hidden lg:block text-sm lg:text-base'>quantity : {curr.quantity}</div>
        </div>
        })
    }
    </>
  )
}

export default Reviewpage
