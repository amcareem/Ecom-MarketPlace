import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../components/context'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Productcard from '../components/Productcard';

const ShopProductPage = () => {
  const {shopId} = useParams();
  const { productList,setProductList,cartList} = useGlobalContext();
  
  // const shopId = params.shopId;
  // console.log("parameter",params);
  useEffect(() =>{
    getAllProducts();
  },[])
  const calculateExpectedDelivery = (expectedDelivery) => {
    if (expectedDelivery) {
      const input = expectedDelivery.toLowerCase();
      const numericValue = parseInt(input);
      if (!isNaN(numericValue)) {
        if (input.includes('hour') || input.includes('hours')) {
          const deliveryDate = new Date();
          deliveryDate.setHours(deliveryDate.getHours() + numericValue);
          // Get the day of the month
          const dayOfMonth = deliveryDate.getDate();
          // Get the month name
          const monthName = deliveryDate.toLocaleString('en-US', { month: 'long' });
          // Create the formatted date string
          const formattedDate = `${dayOfMonth}${getDayOrdinalSuffix(dayOfMonth)} ${monthName}`;
          // Get the time part of the delivery date
          const time = deliveryDate.toLocaleTimeString('en-US', { timeStyle: 'short' });
          // Combine the formatted date and time
          const formattedDateTime = `${formattedDate}, ${time}`;
          return formattedDateTime;
        } else if (input.includes('day') || input.includes('days')) {
          const deliveryDate = new Date();
          deliveryDate.setDate(deliveryDate.getDate() + numericValue);
          // Get the day of the month
          const dayOfMonth = deliveryDate.getDate();
          // Get the month name
          const monthName = deliveryDate.toLocaleString('en-US', { month: 'long' });
          // Create the formatted date string
          const formattedDate = `${dayOfMonth}${getDayOrdinalSuffix(dayOfMonth)} ${monthName}`;
          // Get the time part of the delivery date
          const time = deliveryDate.toLocaleTimeString('en-US', { timeStyle: 'short' });
          // Combine the formatted date and time
          const formattedDateTime = `${formattedDate}, ${time}`;
          return formattedDateTime;
        }
      }
    }
    return '';
  };
  const getDayOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  const getAllProducts = async() => {
    return await axios
      .get(`http://localhost:3002/onboard/getProduct/${shopId}`)
      .then((response) => {
        setProductList(response.data);
        // response.data.forEach((curr) =>{
        //   cartList.forEach((cart) =>{
        //     if(curr.productId === cart.productId){
        //       setGoToCart(true);
        //       console.log(curr.productId)
        //     }
        //   })
        // })
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    
  }
  
  return (
    <>
      <div className='font-Inter mt-10 flex px-1 lg:px-4 gap-8'>
        <div className='hidden lg:block w-3/12 bg-cardColor h-screen'>
          <h1 className='text-center'>Product Category</h1>
        </div>
        <div className='w-full lg:w-7/12 mx-auto'> {
        productList.length >=1 ? productList.map((currProduct) =>{
          const expectedDelivery = calculateExpectedDelivery(currProduct.expectedDelivery)
          return <Productcard 
            productName = {currProduct.productName} 
            productDescription= {currProduct.productDescription} 
            productImagePath = {currProduct.mainImagePath}
            productPrice = {currProduct.productPrice}
            productId = {currProduct.productId}
            expectedDelivery = {expectedDelivery}
            isAvailable = {currProduct.isAvailable}
            shopId = {shopId}
          />
        }): <div className='noResult'>No result found...</div>
      }</div>
      <div className='hidden lg:block w-2/12 bg-cardColor h-screen'>
          <h1 className='text-center'>Advertisement</h1>
      </div>
      </div>
      
    </>
  )
}

export default ShopProductPage
