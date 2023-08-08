import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cartproductcard from '../components/Cartproductcard';
import { useGlobalContext } from '../components/context';
import { Link } from 'react-router-dom';
import Carttotal from '../components/Carttotal';
import Skeletoncard from '../components/skeletonComponents/Skeletoncard';
import SkeletonCarttoal from '../components/skeletonComponents/SkeletonCarttoal';

const Usercart = () => {
   const {userId} = useParams();
   const{cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice} = useGlobalContext();
   const {cartList,setCartList} = useGlobalContext();
   const[isLoading,setIsLoading] = useState(false)
   const skeleton = ['1','2','3'];
   const navigate = useNavigate();
   useEffect(()=>{
    setIsLoading(true)
    getcartDetails();
    setTimeout(()=>{
      setIsLoading(false)
    },1000)
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
      <div className='flex flex-col lg:flex-row justify-around mt-1 lg:mt-8 p-2 lg:p-8 font-Inter'>
        <div className='block lg:hidden px-1'>
          <Carttotal />
        </div>
        <div className='w-full lg:w-8/12  h-fit lg:border lg:border-slate-300 rounded-md lg:p-5'>
          {
            isLoading ? 
            skeleton.map((curr)=>{return <Skeletoncard />}):
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
          {
            isLoading?<div className='hidden lg:block w-3/12'><SkeletonCarttoal /></div>
            :<div className='hidden lg:block w-3/12'>
            <Carttotal />
            </div>
          }
          
          
      </div>
    </>
    
  )
}

export default Usercart
