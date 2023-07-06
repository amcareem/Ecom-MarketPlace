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
  const handleBuynow = async() =>{
    return await axios
      .post("http://localhost:7000/create-checkout-session")
      .then((res)=>{
        if(res.data.url){
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
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
      <div className='border-1 border-white m-auto capitalize rounded-lg font-Inter bg-cardColor flex px-4 py-3 mb-2'>
        <div><img className='w-10/12' src={`http://localhost:3002/${props.productImagePath}`}/></div>
        <div className='flex flex-col gap-2 w-6/12 justify-start items-start'>
          <div className='text-2xl font-bold'>{props.productName}</div>
          <div className=''>{props.productDescription}</div>
          <div className=''>Rating</div>
          <div className=''>
            <div className='text-xl font-semibold'>₹{props.productPrice}</div>
              
          </div>
        </div>
        <div className='w-3/12 flex flex-col gap-3 justify-center text-white font-semibold'>
            <div><button onClick={handleBuynow} className='bg-buttonColor w-full h-10 rounded-md'>Buy Now</button></div>
            <div><button onClick={handleAddtocart} className='bg-white border-2 border-buttonColor text-black w-full h-10 rounded-md'>Add to cart</button></div>
        </div>
        

      </div>
    </>
  )
}

export default ProductCard