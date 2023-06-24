import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const ProductCard = (props) => {
  const[productAmount,setProductAmount] = useState(0);
  const incAmount = () =>{
    (productAmount < 9) ? setProductAmount(productAmount+1) : setProductAmount(productAmount);
  }
  const decAmount = () =>{
    (productAmount > 0) ? setProductAmount(productAmount-1) : setProductAmount(productAmount);
  }
  return (
    <>
      <div className='border-1 border-white m-auto font-Inter capitalize rounded-lg bg-cardColor flex px-4 py-3 mb-2'>
        <div><img className='w-10/12' src={`http://localhost:3002/${props.productImagePath}`}/></div>
        <div className='flex flex-col gap-3 w-6/12 justify-start items-start'>
          <div className='text-2xl font-bold'>{props.productName}</div>
          <div className=''>{props.productDescription}</div>
          <div className=''>Rating</div>
          <div className=''>
            <div className='text-2xl'>₹{props.productPrice}</div>
              
          </div>
        </div>
        <div className='w-3/12 flex flex-col gap-3 justify-center text-white'>
            <div><button className='bg-buttonColor w-full h-10 rounded-md'>Buy Now</button></div>
            <div><button className='bg-white border-2 border-buttonColor text-black w-full h-10 rounded-md'>Add to cart</button></div>
        </div>
        

      </div>
    </>
  )
}

export default ProductCard