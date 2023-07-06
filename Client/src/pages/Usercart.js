import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cartproductcard from '../components/Cartproductcard';
import { useGlobalContext } from '../components/context';
import { Link } from 'react-router-dom';
import Carttotal from '../components/Carttotal';

const Usercart = () => {
   const {userId} = useParams();
   const{cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice} = useGlobalContext();
   const {cartList,setCartList} = useGlobalContext();
   const navigate = useNavigate();
   useEffect(()=>{
    getcartDetails();
   },[])
   const getcartDetails = async() =>{
    return await axios
    .get(`http://localhost:9000/cart/getCartDetails/${userId}`,{
        headers : {
            "Authorization" : window.localStorage.getItem("token"), 
          }
    })
    .then((res) =>{
        console.log(res.data);
        setCartList(res.data);
        cartTotal(res.data);
        
    })
    .catch((err) =>{
        console.log(err.msg);
    })
   }
   const cartTotal = (cartList) =>{
    let totalPrice = 0;
    let totalQuantity = 0;
    cartList.forEach((item) =>{
      totalPrice += item.productAmount * item.quantity;
      totalQuantity += item.quantity;
    })
    setCartProductCounter(totalQuantity);
    setCartTotalPrice(totalPrice);
    window.localStorage.setItem("totalQuantity",JSON.stringify(totalQuantity));
    window.localStorage.setItem("totalPrice",JSON.stringify(totalPrice));
   }
  return (
    <>
      <div className='flex justify-around mt-8 p-8 font-Inter'>
      <div className='w-8/12 border h-fit border-slate-300 rounded-md p-5'>
        {
          cartList.map((currProduct)=>{
              return <Cartproductcard 
                productId = {currProduct.productId}
                productName={currProduct.productName}
                productAmount={currProduct.productAmount}
                productImagePath = {currProduct.ImagePath}
                quantity = {currProduct.quantity}
                userId = {userId}
              />
          }
          )
        }
        </div>
        <div className='w-3/12'>
          <Carttotal />
        </div>
          
      </div>
    </>
    
  )
}

export default Usercart
