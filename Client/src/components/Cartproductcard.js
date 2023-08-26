import React, { useState } from 'react'
import { useGlobalContext } from './context';
import axios from 'axios';

const Cartproductcard = (props) => {
  const{cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice} = useGlobalContext();
  const{cartList,setCartList} = useGlobalContext();
  const{ productId,productName,productAmount,userId,productImagePath,quantity } = props;
  const increaseCount = async()=>{
    if(quantity < 9){
      return await axios
      .put("http://localhost:9000/cart/updateCart",{
        productId : productId,
        quantity : quantity+1
      })
      .then(res =>{
        console.log(res.data);
        const upDatedCartList = cartList.map((item) =>{
          if(item.productId === productId){
            return {
              ...item,
              quantity : res.data.quantity
            }
          }
          return item;
        })
        setCartList(upDatedCartList);
        setCartProductCounter(cartProductCounter + 1);
        setCartTotalPrice(cartTotalPrice + productAmount);
        window.localStorage.setItem("totalQuantity",JSON.stringify(cartProductCounter + 1))
        window.localStorage.setItem("totalPrice",JSON.stringify(cartTotalPrice + productAmount));
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    
  }
  const decreaseCount = async()=>{
    if(quantity > 1){
      return await axios
      .put("http://localhost:9000/cart/updateCart",{
        productId : productId,
        quantity : quantity-1
      })
      .then(res =>{
        console.log(res.data);
        const upDatedCartList = cartList.map((item) =>{
          if(item.productId === productId){
            return {
              ...item,
              quantity : res.data.quantity
            }
          }
          return item;
        })
        setCartList(upDatedCartList);
        setCartProductCounter(cartProductCounter - 1);
        setCartTotalPrice(cartTotalPrice - productAmount);
        window.localStorage.setItem("totalQuantity",JSON.stringify(cartProductCounter - 1));
        window.localStorage.setItem("totalPrice",JSON.stringify(cartTotalPrice - productAmount));
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }
  // const totalCart = () =>{
  //   let totalPrice = 0;
  //   let totalQuantity = 0;
  //   cartList.forEach((item) =>{
  //     totalPrice += item.productAmount * item.quantity;
  //     totalQuantity += item.quantity;
  //   })
  //   setCartProductCounter(totalQuantity);
  //   setCartTotalPrice(totalPrice);
  // }
  const deleteFromCart = async()=>{
    return await axios
    .post(`http://localhost:9000/cart/deleteFromCart`,{
      productId : productId
    }
    )
    .then((res) =>{
        console.log(res);
        let upDatedCartList = cartList.filter((currItem) => currItem.productId !== props.productId)
        setCartList(upDatedCartList);
        setCartProductCounter(cartProductCounter - quantity);
        setCartTotalPrice(cartTotalPrice - (productAmount*quantity));
        window.localStorage.setItem("totalQuantity",JSON.stringify(cartProductCounter - quantity));
        window.localStorage.setItem("totalPrice",JSON.stringify(cartTotalPrice - (productAmount*quantity)));
        // console.log(upDatedCartList)
    })
    .catch((err) =>{
        console.log(err.msg);
    })
  }

  return (
    <>
    <div className='border-1 h-fit  border-white m-auto font-Inter capitalize rounded-lg bg-cardColor flex lg:items-center gap-2 pl-2 pr-1 lg:px-4  py-3 mb-2'>
      <div className='flex flex-col gap-4 w-5/12 lg:w-3/12 mr-3 lg:mr-0'>
        <div className=''><img className='py-1 w-full lg:w-11/12' src={`http://localhost:3002/${props.productImagePath}`}/></div>

        {/* mobile button */}

        <div className='lg:hidden flex gap-3 justify-center h-8 items-center'>
            <div className=''>
              <button onClick={()=>decreaseCount()} className='bg-white border border-slate-300 w-6 rounded-lg'>-</button>
            </div>
            <div className='bg-white border border-slate-300 w-9 h-7 text-center pt-[2px]'>{quantity}</div>
            <div className=''><button onClick={()=>increaseCount()} className='bg-white border border-slate-300 w-6 rounded-lg'>+</button></div>
              {/* <div><button onClick={handleBuynow} className='bg-buttonColor w-full h-10 rounded-md'>Buy Now</button></div> */}
            
          </div>
        </div>
        <div className='flex flex-col gap-2 w-6/12 justify-start items-start'>
          <div className='text-md lg:text-xl font-semibold'>{props.productName}</div>
          <div className='text-xs font-medium'>
            Delivery by 12th january
          </div>
          <div className='text-green-500 text-sm font-semibold'>
            In stock
          </div>
          <div className=''>
            <div className='text-xl font-semibold'>₹{productAmount}</div>
          </div>

          {/* mobile button */}

          <div className='lg:hidden'><button onClick={deleteFromCart} className='bg-white border-2 focus:border-red-700 border-red-700 text-red-700 w-36 text-sm lg:text-md lg:w-full h-8 lg:h-10 rounded-md'>Remove from cart</button></div>
        </div>
        <div className='hidden lg:flex flex-col justify-around items-center h-28 w-3/12 font-semibold'>
          <div className='flex gap-3 justify-center h-8 items-center'>
            <div className=''>
              <button onClick={()=>decreaseCount()} className='bg-white border border-slate-300 w-6 rounded-lg'>-</button>
            </div>
            <div className='bg-white border border-slate-300 w-9 h-7 text-center pt-[2px]'>{quantity}</div>
            <div className=''><button onClick={()=>increaseCount()} className='bg-white border border-slate-300 w-6 rounded-lg'>+</button></div>
              {/* <div><button onClick={handleBuynow} className='bg-buttonColor w-full h-10 rounded-md'>Buy Now</button></div> */}
            
          </div>
          <div className='hidden lg:block'><button onClick={deleteFromCart} className='bg-white border-2 focus:border-red-700 border-red-700 text-red-700 w-48 h-10 rounded-md'>Remove from cart</button></div>
        </div>
        
        {/* <div className='flex w-'>
          <
        </div> */}
      </div>
      </>
  )
}

export default Cartproductcard
