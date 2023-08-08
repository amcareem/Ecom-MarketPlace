import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductCard = (props) => {
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  const token = window.localStorage.getItem("token");
  // const product = {
  //   productName : props.productName, 
  //   productDescription: props.productDescription, 
  //   productImagePath : props.productImagePath,
  //   productPrice : props.productPrice,
  //   productId : props.productId
  // }
  
  const handleAddtocart = async() =>{
    return await axios
      .post("http://localhost:9000/cart/addToCart",{
        productId : props.productId,
        uuid: userInfo.user_id,
        productName : props.productName,
        productAmount : props.productPrice,
        productImagePath : props.productImagePath,
        shopId : props.shopId,
        quantity : 1
      },
      {
        headers : {
          "Authorization" : token, 
        }
      })
      .then((res)=>{
        console.log(res);
        
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <>
      <div className='border-1 border-white m-auto capitalize rounded-lg font-Inter bg-cardColor flex pl-2 pr-1 lg:px-4  py-3 mb-2'>
        <div className='flex flex-col gap-2 w-5/12 lg:w-4/12 mr-3 lg:mr-0'>
          <div className=''><img className='w-full lg:w-10/12' src={`http://localhost:3002/${props.productImagePath}`}/></div>
          <div className='lg:hidden w-full flex flex-col gap-2 justify-center text-sm text-white font-semibold'>
              <div><button className='bg-buttonColor w-full h-8 rounded-md'>Buy Now</button></div>
              <div><button onClick={handleAddtocart} className='bg-white border-2 border-buttonColor text-black w-full h-8 rounded-md'>Add to cart</button></div>
          </div>
        </div>
        <div className='flex flex-col gap-2 w-6/12 justify-start items-start'>
          <div className='text-md font-semibold lg:text-2xl lg:font-bold'>{props.productName}</div>
          <div className='text-sm lg:text-md'>{props.productDescription}</div>
          <div className='text-sm lg:text-md'>Rating</div>
          <div className=''>
            <div className='text-xl font-semibold'>₹{props.productPrice}</div>
              
          </div>
        </div>
        <div className='w-3/12 hidden lg:flex flex-col gap-3 justify-center text-white font-semibold'>
            <div><button className='bg-buttonColor w-full h-10 rounded-md'>Buy Now</button></div>
            <div><button onClick={handleAddtocart} className='bg-white border-2 border-buttonColor text-black w-full h-10 rounded-md'>Add to cart</button></div>
        </div>
        

      </div>
    </>
  )
}

export default ProductCard